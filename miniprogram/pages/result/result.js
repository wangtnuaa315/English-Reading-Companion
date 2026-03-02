// pages/result/result.js
const ocr = require('../../utils/ocr')
const translator = require('../../utils/translator')
const phonetics = require('../../utils/phonetics')
const tts = require('../../utils/tts')
const storage = require('../../utils/storage')

Page({
    data: {
        imagePath: '',
        wordList: [],
        isLoading: true,
        playingIndex: -1,
        historyId: ''
    },

    onLoad(options) {
        if (options.historyId) {
            // 从历史记录打开
            this.loadFromHistory(options.historyId)
        } else {
            // 从首页选图进入
            const app = getApp()
            const imagePath = app.globalData.selectedImagePath
            if (imagePath) {
                this.setData({ imagePath })
                this.processImage(imagePath)
            } else {
                wx.showToast({ title: '未选择图片', icon: 'none' })
                setTimeout(() => wx.navigateBack(), 1500)
            }
        }
    },

    onUnload() {
        tts.stop()
    },

    // 从历史记录加载
    async loadFromHistory(historyId) {
        const record = storage.getHistoryById(historyId)
        if (record) {
            // 兼容由于版本升级导致的旧数据格式（老的记录里没有 wordTokens 字段）
            const compatibleWordsPromises = (record.words || []).map(async w => {
                if (!w.wordTokens && w.word) {
                    const wordParts = w.word.split(' ');
                    const tokens = [];
                    for (let t of wordParts) {
                        const cleanWordMatch = t.match(/[a-zA-Z'-]+/);
                        const cleanWord = cleanWordMatch ? cleanWordMatch[0] : '';
                        let tokenPhonetic = '';
                        if (cleanWord) {
                            tokenPhonetic = phonetics.getPhonetic(cleanWord);
                            if (!tokenPhonetic) {
                                try {
                                    const result = await translator.translateWithPhonetic(cleanWord);
                                    tokenPhonetic = result.phonetic || '';
                                } catch (e) { /* skip */ }
                            }
                            if (!tokenPhonetic) {
                                try { tokenPhonetic = await phonetics.getPhoneticAsync(cleanWord); } catch (e) { /* skip */ }
                            }
                        }
                        tokens.push({ text: t, phonetic: tokenPhonetic });
                    }
                    w.wordTokens = tokens;
                }
                return w
            })

            const compatibleWords = await Promise.all(compatibleWordsPromises);

            this.setData({
                imagePath: record.imagePath || '',
                wordList: compatibleWords,
                isLoading: false,
                historyId: historyId
            })
        } else {
            wx.showToast({ title: '记录不存在', icon: 'none' })
            setTimeout(() => wx.navigateBack(), 1500)
        }
    },

    // 处理图片：OCR → 翻译 → 音标
    async processImage(imagePath) {
        this.setData({ isLoading: true })

        try {
            // 1. OCR 识别
            const ocrResult = await ocr.recognizeText(imagePath)

            if (!ocrResult || !ocrResult.success) {
                // OCR 底层已经弹出明确的错误提示，因此这里直接返回不要打断
                this.setData({ isLoading: false })
                return
            }

            if (!ocrResult.data.words || !ocrResult.data.words.length) {
                wx.showToast({ title: '未识别到文字', icon: 'none' })
                this.setData({ isLoading: false })
                return
            }

            // 2. 对每段识别文本：先翻译整句，再逐词查询音标
            const wordPromises = ocrResult.data.words.map(async item => {
                const word = item.text
                // 整句翻译获取中文释义
                const translation = await translator.translate(word)

                // 将句子按空格拆分为各个词组，逐词获取音标
                const wordParts = word.split(' ')
                const tokens = []

                // 串行请求避免微信并发限制 (最多同时 10 个 wx.request)
                for (let t of wordParts) {
                    const cleanWordMatch = t.match(/[a-zA-Z'-]+/);
                    const cleanWord = cleanWordMatch ? cleanWordMatch[0] : '';
                    let tokenPhonetic = '';

                    if (cleanWord) {
                        // 1. 优先从本地离线词典查（0 延迟）
                        tokenPhonetic = phonetics.getPhonetic(cleanWord);

                        // 2. 本地没有 → 调用百度翻译词典版，翻译结果不使用但提取音标
                        if (!tokenPhonetic) {
                            try {
                                const result = await translator.translateWithPhonetic(cleanWord);
                                tokenPhonetic = result.phonetic || '';
                            } catch (e) {
                                console.log('[Phonetic] 百度词典查询跳过:', cleanWord);
                            }
                        }

                        // 3. 百度也没有 → 尝试 Free Dictionary API 作最后兜底
                        if (!tokenPhonetic) {
                            try {
                                tokenPhonetic = await phonetics.getPhoneticAsync(cleanWord);
                            } catch (e) { /* 静默 */ }
                        }
                    }

                    tokens.push({ text: t, phonetic: tokenPhonetic })
                }

                return {
                    word: word,
                    wordTokens: tokens,
                    phonetic: phonetics.getPhonetic(word),
                    translation: translation,
                    confidence: item.confidence || 0
                }
            })

            const words = await Promise.all(wordPromises)

            this.setData({
                wordList: words,
                isLoading: false
            })

            // 3. 保存到历史记录
            this.saveToHistory(imagePath, words)

        } catch (err) {
            console.error('[Result] Process error:', err)
            // 不弹出默认提示，防止覆盖底层 ocr.js 里详细由于网络或认证的报警
            this.setData({ isLoading: false })
        }
    },

    // 保存到历史记录
    saveToHistory(imagePath, words) {
        const firstWords = words.slice(0, 3).map(w => w.word).join(', ')
        const title = firstWords + (words.length > 3 ? '...' : '')

        const id = storage.saveHistory({
            imagePath: imagePath,
            title: title || '英文翻译',
            words: words
        })

        if (id) {
            this.setData({ historyId: id })
        }
    },

    // 朗读单个单词
    playWord(e) {
        const index = e.currentTarget.dataset.index
        const word = e.currentTarget.dataset.word

        this.setData({ playingIndex: index })

        tts.speak(word, () => {
            this.setData({ playingIndex: -1 })
        }).catch(() => {
            this.setData({ playingIndex: -1 })
        })
    },

    // 朗读全部
    async playAll() {
        const words = this.data.wordList.map(w => w.word)
        if (words.length === 0) return

        wx.showToast({ title: '正在朗读...', icon: 'none', duration: 2000 })

        try {
            await tts.speakAll(words, (index) => {
                this.setData({ playingIndex: index })
            })
            this.setData({ playingIndex: -1 })
        } catch (err) {
            console.error('[Result] PlayAll error:', err)
            this.setData({ playingIndex: -1 })
        }
    },

    // 全部翻译（重新处理）
    translateAll() {
        if (this.data.imagePath) {
            this.processImage(this.data.imagePath)
        }
    },

    // 复制内容
    copyContent() {
        const content = this.data.wordList.map(w => {
            return `${w.phonetic ? w.phonetic + ' ' : ''}${w.word} - ${w.translation}`
        }).join('\n')

        if (!content) {
            wx.showToast({ title: '暂无内容可复制', icon: 'none' })
            return
        }

        wx.setClipboardData({
            data: content,
            success: () => {
                wx.showToast({ title: '已复制到剪贴板', icon: 'success' })
            }
        })
    },

    // 保存生词
    saveWordList() {
        const words = this.data.wordList.map(w => ({
            word: w.word,
            phonetic: w.phonetic,
            translation: w.translation
        }))

        if (words.length === 0) {
            wx.showToast({ title: '暂无生词可保存', icon: 'none' })
            return
        }

        const count = storage.saveWords(words)
        if (count > 0) {
            wx.showToast({ title: `已保存 ${count} 个新生词`, icon: 'success' })
        } else {
            wx.showToast({ title: '所有生词已保存过', icon: 'none' })
        }
    },

    // 预览图片
    previewImage() {
        if (this.data.imagePath) {
            wx.previewImage({
                urls: [this.data.imagePath],
                current: this.data.imagePath
            })
        }
    }
})
