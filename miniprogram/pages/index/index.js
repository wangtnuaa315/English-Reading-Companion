// pages/index/index.js
const storage = require('../../utils/storage')

Page({
    data: {
        statusBarHeight: 20,
        historyList: []
    },

    onLoad() {
        // 获取状态栏高度（用于自定义导航栏）
        const sysInfo = wx.getSystemInfoSync()
        this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 })
    },

    onShow() {
        this.loadHistory()
    },

    // 加载历史记录
    loadHistory() {
        const history = storage.getHistory()
        const displayList = history.slice(0, 5).map(item => ({
            ...item,
            timeDisplay: storage.formatTime(item.timestamp)
        }))
        this.setData({ historyList: displayList })
    },

    // 上传图片（从相册或拍照）
    chooseImage() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const tempFilePath = res.tempFiles[0].tempFilePath
                this.navigateToResult(tempFilePath)
            }
        })
    },

    // 拍摄照片
    takePhoto() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sizeType: ['compressed'],
            sourceType: ['camera'],
            success: (res) => {
                const tempFilePath = res.tempFiles[0].tempFilePath
                this.navigateToResult(tempFilePath)
            }
        })
    },

    // 从相册选择
    chooseFromAlbum() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: (res) => {
                const tempFilePath = res.tempFiles[0].tempFilePath
                this.navigateToResult(tempFilePath)
            }
        })
    },

    // 跳转到结果页
    navigateToResult(imagePath) {
        // 将图片路径存到全局
        const app = getApp()
        app.globalData.selectedImagePath = imagePath
        wx.navigateTo({
            url: '/pages/result/result'
        })
    },

    // 查看历史记录详情
    goToResult(e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/result/result?historyId=${id}`
        })
    },

    // 查看全部历史
    viewAllHistory() {
        wx.switchTab({
            url: '/pages/history/history'
        })
    },

    // 设置
    onSettings() {
        wx.showToast({ title: '设置功能开发中', icon: 'none' })
    }
})
