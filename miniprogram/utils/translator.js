/**
 * 翻译工具
 * 使用百度智能云机器翻译 API (文本翻译-词典版)
 */

const { getTranslateToken } = require('./baidu-token');
// 依然保留本地备用小词典，当网络失败时容灾
const { translationDict } = require('./dict');

function translate(word) {
    return new Promise((resolve) => {
        if (!word) {
            resolve('');
            return;
        }

        getTranslateToken().then(token => {
            wx.request({
                // 百度机器翻译基础版/标准版文本翻译接口 (采用文本翻译-词典版)
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
    // 可以考虑优化为一次请求传多个词拼接，但这里为了逻辑简单清晰先遍历请求
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

module.exports = { translate, translateBatch, translationDict }
