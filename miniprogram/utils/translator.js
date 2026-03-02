/**
 * 翻译工具
 * 使用百度智能云机器翻译 API (文本翻译-词典版)
 * 词典版在查询单个词/词组时，会额外返回 dict 字段，内含音标等词典信息
 */

const { getTranslateToken } = require('./baidu-token');
// 依然保留本地备用小词典，当网络失败时容灾
const { translationDict } = require('./dict');

/**
 * 翻译文本（仅返回翻译结果字符串，保持向后兼容）
 */
function translate(word) {
    return new Promise((resolve) => {
        if (!word) {
            resolve('');
            return;
        }

        getTranslateToken().then(token => {
            wx.request({
                url: `https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token=${token}`,
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    q: word,
                    from: 'en',
                    to: 'zh'
                },
                success: (res) => {
                    if (res.data && res.data.result && res.data.result.trans_result) {
                        const translatedText = res.data.result.trans_result[0].dst;
                        resolve(translatedText);
                    } else {
                        console.error('[Translate Error]', res.data);
                        fallbackLocalTranslate(word, resolve);
                    }
                },
                fail: (err) => {
                    console.error('[Translate Network Error]', err);
                    fallbackLocalTranslate(word, resolve);
                }
            });
        }).catch(err => {
            console.error('[Translate Token Error]', err);
            fallbackLocalTranslate(word, resolve);
        });
    });
}

/**
 * 翻译单个词并同时提取音标（从百度词典版 dict 字段）
 * @param {string} word - 英文单词
 * @returns {Promise<{translation: string, phonetic: string}>}
 */
function translateWithPhonetic(word) {
    return new Promise((resolve) => {
        if (!word) {
            resolve({ translation: '', phonetic: '' });
            return;
        }

        getTranslateToken().then(token => {
            wx.request({
                url: `https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token=${token}`,
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    q: word,
                    from: 'en',
                    to: 'zh'
                },
                success: (res) => {
                    let translation = '';
                    let phonetic = '';

                    if (res.data && res.data.result && res.data.result.trans_result) {
                        translation = res.data.result.trans_result[0].dst;

                        // 尝试从 dict 字段提取音标
                        // 百度词典版在查单个词时，dict 是一个 JSON 字符串
                        try {
                            const dictStr = res.data.result.trans_result[0].dict;
                            if (dictStr) {
                                const dictData = typeof dictStr === 'string' ? JSON.parse(dictStr) : dictStr;
                                console.log('[Dict Raw]', word, JSON.stringify(dictData).substring(0, 500));

                                // 路径 1: word_result.simple_means.symbols[0].ph_am / ph_en
                                if (dictData.word_result && dictData.word_result.simple_means) {
                                    const sm = dictData.word_result.simple_means;
                                    if (sm.symbols && sm.symbols.length > 0) {
                                        phonetic = sm.symbols[0].ph_am || sm.symbols[0].ph_en || '';
                                    }
                                }

                                // 路径 2: 顶层 phonetic 字段
                                if (!phonetic && dictData.phonetic) {
                                    phonetic = dictData.phonetic;
                                }

                                // 路径 3: word_result.simple_means.exchange 等其他位置
                                if (!phonetic && dictData.word_result && dictData.word_result.simple_means && dictData.word_result.simple_means.phonetic) {
                                    phonetic = dictData.word_result.simple_means.phonetic;
                                }

                                if (phonetic) {
                                    if (!phonetic.startsWith('/')) phonetic = '/' + phonetic + '/';
                                }
                            } else {
                                console.log('[Dict Empty]', word, '无 dict 字段');
                            }
                        } catch (e) {
                            console.log('[Dict Parse] 词典字段解析跳过:', e.message);
                        }
                    } else {
                        console.error('[Translate Error]', res.data);
                    }

                    if (!translation) {
                        const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
                        translation = translationDict[lowerWord] || '(未找到释义)';
                    }

                    resolve({ translation, phonetic });
                },
                fail: (err) => {
                    console.error('[Translate Network Error]', err);
                    const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
                    const fallback = translationDict[lowerWord] || '(网络异常)';
                    resolve({ translation: fallback, phonetic: '' });
                }
            });
        }).catch(err => {
            console.error('[Translate Token Error]', err);
            const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
            const fallback = translationDict[lowerWord] || '(网络异常)';
            resolve({ translation: fallback, phonetic: '' });
        });
    });
}

/**
 * 容灾：如果网络失败或没额度，退回到本地小词典
 */
function fallbackLocalTranslate(word, resolve) {
    const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
    const result = translationDict[lowerWord];
    resolve(result || '(网络异常, 未找到释义)');
}

/**
 * 批量翻译
 */
async function translateBatch(words) {
    const result = [];
    for (let i = 0; i < words.length; i++) {
        const t = await translate(words[i]);
        result.push({
            word: words[i],
            translation: t
        });
    }
    return result;
}

module.exports = { translate, translateWithPhonetic, translateBatch, translationDict }
