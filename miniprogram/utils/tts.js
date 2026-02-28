/**
 * TTS 语音合成工具
 * 使用百度智能云语音合成 API
 */

const { getOcrToken } = require('./baidu-token'); // 复用现成的 token 即可
let innerAudioContext = null

function speak(text, onEnd) {
    return new Promise((resolve, reject) => {
        if (!text) {
            reject(new Error('No text provided'))
            return
        }

        stop()

        getOcrToken().then(token => {
            innerAudioContext = wx.createInnerAudioContext()

            const encodedText = encodeURIComponent(text.trim())
            const url = `https://tsn.baidu.com/text2audio?tex=${encodedText}&lan=zh&cuid=wx_mina_app&ctp=1&tok=${token}&per=5`

            // 使用 wx.request 并设置 responseType 以便既能捕获 json 错误，又能处理 mp3 流
            wx.request({
                url: url,
                method: 'GET',
                responseType: 'arraybuffer',
                success: (res) => {
                    if (res.statusCode === 200) {
                        // 检查内容类型，如果是 json 说明报错了，如果是 audio/mp3 说明成功了
                        const isJson = res.header['Content-Type'] && res.header['Content-Type'].includes('json');

                        if (isJson) {
                            // 将 arraybuffer 转换为字符串解析
                            let errorResult = '';
                            try {
                                const uint8Array = new Uint8Array(res.data);
                                // 微信小程序基础库 ArrayBuffer 转字符串的兼容写法
                                errorResult = String.fromCharCode.apply(null, uint8Array);
                                errorResult = decodeURIComponent(escape(errorResult));
                            } catch (e) {
                                errorResult = '解析失败';
                            }
                            console.error('[TTS Baidu API Error]', errorResult);
                            wx.showModal({ title: '百度语音接口报错', content: errorResult, showCancel: false });
                            reject(new Error(errorResult));
                            return;
                        }

                        // 成功，将 arraybuffer 写入本地文件系统并播放
                        const fsm = wx.getFileSystemManager();
                        const filePath = `${wx.env.USER_DATA_PATH}/temp_tts_${Date.now()}.mp3`;

                        try {
                            fsm.writeFileSync(filePath, res.data, 'binary');

                            innerAudioContext.src = filePath;
                            innerAudioContext.onPlay(() => console.log('[TTS] Playing:', text))
                            innerAudioContext.onEnded(() => {
                                console.log('[TTS] Ended:', text)
                                // 清理零时文件
                                fsm.unlink({ filePath: filePath, fail: () => { } })
                                if (onEnd) onEnd()
                                resolve()
                            })
                            innerAudioContext.onError((err) => {
                                console.error('[TTS Local Play Error]', err)
                                wx.showModal({ title: '本地播放失败', content: err.errMsg || JSON.stringify(err), showCancel: false })
                                reject(err)
                            })
                            innerAudioContext.play();
                        } catch (writeErr) {
                            console.error('[TTS Write Error]', writeErr);
                            wx.showToast({ title: '写入临时音频失败', icon: 'none' });
                            reject(writeErr);
                        }
                    } else {
                        wx.showModal({ title: '语音请求失败', content: 'HTTP状态码: ' + res.statusCode, showCancel: false });
                        reject(new Error('Request failed: ' + res.statusCode));
                    }
                },
                fail: (err) => {
                    console.error('[TTS Network Error]', err);
                    wx.showModal({ title: '语音网络请求失败', content: err.errMsg || JSON.stringify(err), showCancel: false });
                    reject(err);
                }
            });
        }).catch(err => {
            console.error('[TTS Auth Error]', err)
            wx.showToast({ title: '语音授权失败', icon: 'none' })
            reject(err)
        });
    })
}

function stop() {
    if (innerAudioContext) {
        innerAudioContext.stop()
        innerAudioContext.destroy()
        innerAudioContext = null
    }
}

async function speakAll(words, onProgress) {
    for (let i = 0; i < words.length; i++) {
        if (onProgress) onProgress(i, words[i])
        try {
            await speak(words[i])
            await new Promise(r => setTimeout(r, 600))
        } catch (e) {
            console.error(e)
        }
    }
}

function isPlaying() {
    return innerAudioContext && !innerAudioContext.paused
}

module.exports = { speak, stop, speakAll, isPlaying }
