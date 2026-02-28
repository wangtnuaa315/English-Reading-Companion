// pages/history/history.js
const storage = require('../../utils/storage')

Page({
    data: { historyList: [] },

    onShow() {
        this.loadHistory()
    },

    loadHistory() {
        const history = storage.getHistory()
        const list = history.map(item => ({
            ...item,
            timeDisplay: storage.formatTime(item.timestamp)
        }))
        this.setData({ historyList: list })
    },

    goToDetail(e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({ url: `/pages/result/result?historyId=${id}` })
    },

    deleteItem(e) {
        const id = e.currentTarget.dataset.id
        wx.showModal({
            title: '确认删除',
            content: '确定要删除这条记录吗？',
            success: (res) => {
                if (res.confirm) {
                    storage.removeHistory(id)
                    this.loadHistory()
                    wx.showToast({ title: '已删除', icon: 'success' })
                }
            }
        })
    },

    clearAll() {
        wx.showModal({
            title: '确认清空',
            content: '确定要清空所有历史记录吗？',
            success: (res) => {
                if (res.confirm) {
                    storage.clearHistory()
                    this.loadHistory()
                    wx.showToast({ title: '已清空', icon: 'success' })
                }
            }
        })
    }
})
