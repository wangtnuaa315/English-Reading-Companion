/**
 * 百度智能云鉴权工具
 * 用于获取和缓存 Access Token
 */

const OCR_API_KEY = 'KXZA3zIUJ7OoFhQdyFhcvtYl';
const OCR_SECRET_KEY = 'hSIXT5rjeTrxjurcUJ3EdgnXsdbigEEi';

const TRANSLATE_API_KEY = 'Rweym3antEzqQZVkBP9Tlml4';
const TRANSLATE_SECRET_KEY = '0VRehdgwhZTsdUgizRn5LtGj4Pzxxx9B';

let ocrTokenCache = { token: '', expireTime: 0 };
let translateTokenCache = { token: '', expireTime: 0 };

/**
 * 获取 OCR 的 Access Token
 */
function getOcrToken() {
    return new Promise((resolve, reject) => {
        // 检查缓存是否过期 (提前5分钟算过期)
        if (ocrTokenCache.token && Date.now() < ocrTokenCache.expireTime - 300000) {
            resolve(ocrTokenCache.token);
            return;
        }

        wx.request({
            url: `https://aip.baidubce.com/oauth/2.0/token`,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            data: {
                grant_type: 'client_credentials',
                client_id: OCR_API_KEY,
                client_secret: OCR_SECRET_KEY
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data && res.data.access_token) {
                    ocrTokenCache.token = res.data.access_token;
                    // 有效期一般为 30 天，转换为毫秒
                    ocrTokenCache.expireTime = Date.now() + res.data.expires_in * 1000;
                    resolve(res.data.access_token);
                } else {
                    console.error('[Baidu Auth Error - OCR]', res.data);
                    reject(new Error(`获取百度OCR权限失败: ${res.data.error_description || res.data.error || '状态码 ' + res.statusCode}`));
                }
            },
            fail: (err) => {
                console.error('[Baidu Auth Network Error - OCR]', err);
                reject(new Error('百度OCR鉴权网络断开: ' + err.errMsg));
            }
        });
    });
}

/**
 * 获取机器翻译的 Access Token
 */
function getTranslateToken() {
    return new Promise((resolve, reject) => {
        // 检查缓存是否过期 (提前5分钟算过期)
        if (translateTokenCache.token && Date.now() < translateTokenCache.expireTime - 300000) {
            resolve(translateTokenCache.token);
            return;
        }

        wx.request({
            url: `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${TRANSLATE_API_KEY}&client_secret=${TRANSLATE_SECRET_KEY}`,
            method: 'POST',
            success: (res) => {
                if (res.data && res.data.access_token) {
                    translateTokenCache.token = res.data.access_token;
                    translateTokenCache.expireTime = Date.now() + res.data.expires_in * 1000;
                    resolve(res.data.access_token);
                } else {
                    console.error('[Baidu Auth Error - Translate]', res.data);
                    reject(new Error('Failed to get Translate access token'));
                }
            },
            fail: (err) => {
                console.error('[Baidu Auth Network Error - Translate]', err);
                reject(err);
            }
        });
    });
}

module.exports = {
    getOcrToken,
    getTranslateToken
}
