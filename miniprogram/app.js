// app.js
App({
  onLaunch() {
    // 初始化本地存储
    if (!wx.getStorageSync('history')) {
      wx.setStorageSync('history', [])
    }
    if (!wx.getStorageSync('savedWords')) {
      wx.setStorageSync('savedWords', [])
    }
  },

  globalData: {
    primaryColor: '#2b7cee',
    // 当前选中的图片临时路径
    selectedImagePath: ''
  }
})
