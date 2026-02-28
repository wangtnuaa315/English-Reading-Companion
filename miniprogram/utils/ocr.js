/**
 * OCR 文字识别工具
 * 使用百度智能云通用文字识别 API
 */

const { getOcrToken } = require('./baidu-token');

function recognizeText(imagePath) {
    return new Promise((resolve, reject) => {
        wx.showLoading({ title: '正在识别...' });

        // 1. 获取本地图片并转 Base64
        wx.getFileSystemManager().readFile({
            filePath: imagePath,
            encoding: 'base64',
            success: (fsRes) => {
                const base64Data = fsRes.data;

                // 2. 获取鉴权 Token
                getOcrToken().then(token => {
                    // 3. 调用百度通用文字识别 (高精度版 - accurate_basic)
                    // 手动拼接 URL Encoded 字符串，因为微信对这种格式的大数据经常出兼容性问题
                    const postData = 'image=' + encodeURIComponent(base64Data) + '&language_type=ENG';

                    wx.request({
                        url: `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=${token}`,
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: postData,
                        success: (apiRes) => {
                            wx.hideLoading();

                            if (!apiRes || !apiRes.data) {
                                wx.showToast({ title: '服务器返回异常', icon: 'none' });
                                resolve({ success: false, data: { words: [] } });
                                return;
                            }

                            // 检查百度官方的 API 错误码
                            if (apiRes.data.error_code) {
                                console.error('[Baidu OCR API Error]', apiRes.data);
                                wx.showModal({
                                    title: '云端识别未成功',
                                    content: `百度云报错 [${apiRes.data.error_code}]: ${apiRes.data.error_msg}`,
                                    showCancel: false
                                });
                                resolve({ success: false, data: { words: [] } });
                                return;
                            }

                            if (apiRes.data.words_result) {
                                // 提取识别结果
                                const words = apiRes.data.words_result.map(item => ({
                                    text: item.words,
                                    confidence: item.probability ? item.probability.average : 1
                                }));

                                resolve({ success: true, data: { words: words } });
                            } else {
                                console.error('[OCR Error Unknown]', apiRes.data);
                                wx.showToast({ title: '识别返回格式错误', icon: 'none' });
                                resolve({ success: false, data: { words: [] } });
                            }
                        },
                        fail: (err) => {
                            wx.hideLoading();
                            console.error('[OCR Request Error]', err);
                            wx.showToast({ title: '网络请求失败', icon: 'none' });
                            reject(err);
                        }
                    });
                }).catch(err => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '获取识别权限失败',
                        content: err.message || JSON.stringify(err),
                        showCancel: false
                    });
                    reject(err);
                });
            },
            fail: (err) => {
                wx.hideLoading();
                wx.showToast({ title: '读取图片失败', icon: 'none' });
                reject(err);
            }
        });
    });
}

module.exports = {
    recognizeText
}
