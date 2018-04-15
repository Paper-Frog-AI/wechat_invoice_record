//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    invoiceList: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  scanCode: function() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => { 
        var invoiceInfo = {};
        var result = res.result;
        var results = result.split(",");
        if (results.length < 6) {
          wx.showToast({
            title: '无效的二维码',
            icon: 'none',
            duration: 5000
          })
          console.log('results length is ' + results.length)
          console.log('results content is: ' + results)

        } else {
          invoiceInfo.code = results[2];
          invoiceInfo.number = results[3];
          invoiceInfo.amount = results[4];
          invoiceInfo.date = results[5];
          app.globalData.invoiceInfo = invoiceInfo;
          wx.navigateTo({
            url: '../invoice/showInvoiceDetail'
          })
        }
    }
  })
  },
  selected1: function (e) {
    
    this.setData({
      selected: false,
      selected1: true
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
