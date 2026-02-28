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
                    const tokenPromises = w.word.split(' ').map(async t => {
                        const cleanWordMatch = t.match(/[a-zA-Z'-]+/);
                        const cleanWord = cleanWordMatch ? cleanWordMatch[0] : '';
                        let phonetic = '';
                        if (cleanWord) {
                            phonetic = await phonetics.getPhoneticAsync(cleanWord);
                        }
                        return {
                            text: t,
                            phonetic: phonetic
                        }
                    })
                    w.wordTokens = await Promise.all(tokenPromises);
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

            // 2. 对每个单词获取翻译和音标
            const wordPromises = ocrResult.data.words.map(async item => {
                const word = item.text
                const translation = await translator.translate(word)

                // 将句子按空格拆分为各个词组
                const tokenPromises = word.split(' ').map(async t => {
                    // 仅提取第一段连续字母以便精准查音标 (忽略连在一起的句号然后变成错误生词)
                    const cleanWordMatch = t.match(/[a-zA-Z'-]+/);
                    const cleanWord = cleanWordMatch ? cleanWordMatch[0] : '';
                    let phonetic = '';
                    if (cleanWord) {
                        phonetic = await phonetics.getPhoneticAsync(cleanWord);
                    }
                    return {
                        text: t,
                        phonetic: phonetic
                    }
                })

                const tokens = await Promise.all(tokenPromises);

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
