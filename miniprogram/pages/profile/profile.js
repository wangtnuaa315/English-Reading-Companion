// pages/profile/profile.js
const storage = require('../../utils/storage')

Page({
    data: {
        stats: { historyCount: 0, wordCount: 0, days: 1 }
    },

    onShow() {
        this.loadStats()
    },

    loadStats() {
        const history = storage.getHistory()
        const words = storage.getWords()

        // 计算学习天数
        let days = 1
        if (history.length > 0) {
            const firstDay = history[history.length - 1].timestamp
            days = Math.max(1, Math.ceil((Date.now() - firstDay) / 86400000))
        }

        this.setData({
            stats: {
                historyCount: history.length,
                wordCount: words.length,
                days: days
            }
        })
    },

    viewWords() {
        const words = storage.getWords()
        if (words.length === 0) {
            wx.showToast({ title: '暂无生词', icon: 'none' })
            return
        }
        // 显示生词列表
        const content = words.slice(0, 20).map(w =>
            `${w.word} ${w.phonetic || ''} - ${w.translation}`
        ).join('\n')

        wx.showModal({
            title: `我的生词本 (${words.length}个)`,
            content: content,
            showCancel: true,
            cancelText: '关闭',
            confirmText: '清空生词',
            success: (res) => {
                if (res.confirm) {
                    wx.showModal({
                        title: '确认清空',
                        content: '确定清空所有生词吗？',
                        success: (r) => {
                            if (r.confirm) {
                                storage.clearWords()
                                this.loadStats()
                                wx.showToast({ title: '已清空', icon: 'success' })
                            }
                        }
                    })
                }
            }
        })
    },

    viewHistory() {
        wx.switchTab({ url: '/pages/history/history' })
    },

    clearCache() {
        wx.showModal({
            title: '清除缓存',
            content: '将清除所有历史记录和生词数据，确定继续吗？',
            success: (res) => {
                if (res.confirm) {
                    storage.clearHistory()
                    storage.clearWords()
                    this.loadStats()
                    wx.showToast({ title: '缓存已清除', icon: 'success' })
                }
            }
        })
    },

    showAbout() {
        wx.showModal({
            title: '关于 AI 英语翻译助手',
            content: 'English Reading Companion v1.0.0\n\n拍照或上传英文图片，AI智能识别翻译，并附带音标和语音朗读，助力英语学习。',
            showCancel: false
        })
    }
})
