// pages/index/showInvoiceDetail.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    invoiceInfo: {},
    submit_person: "",
    note: "",
    sessionID: wx.getStorageSync('sessionID')
  },
  bindSubmitPersonInput: function (e) {
    this.setData({
      submit_person : e.detail.value
    })
  },
  bindNoteInput: function (e) {
    this.setData({
      note: e.detail.value
    })
  },
  submitInfo: function() {
    wx.request({
      url: 'https://wechat.yuboxuan.club/invoice',
      header: {
        'content-type': 'application/json', // 默认值
        'sessionid': this.data.sessionID
      },
      method: 'POST',
      data: {
        code: this.data.invoiceInfo.code,
        number: this.data.invoiceInfo.number,
        amount: this.data.invoiceInfo.amount,
        date: this.data.invoiceInfo.date,
        submit_person: this.data.submit_person,
        note: this.data.note
      },
      success: function (res) {
        console.log("respose code is :" + res.statusCode)
        if (res.statusCode == 201) {
          wx.showToast({
            title: '记录成功！',
            icon: 'success',
            duration: 2000
          })
        } else if (res.statusCode == 302) {
          wx.showToast({
            title: '该发票已记账，请勿重复记账',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '系统错误，请重新扫描',
            icon: 'none',
            duration: 2000
          })
        }
        setTimeout(function() {
          wx.navigateBack()
        },2000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.invoiceInfo) {
      this.setData({
        invoiceInfo: app.globalData.invoiceInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})