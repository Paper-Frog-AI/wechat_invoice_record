// pages/index/listInvoice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //model data
    modelhidden: true,
    modelCode: '',
    modelNumber: '',
    modelAmount: '',
    modelDate: '',
    modelSubmit_person: '',
    modelNote: '',
    modelCreateDate: '',
    userCellId: 0
  },
  cancel: function () {
    this.setData({
      modelhidden: true
    })
  },
  modelpop: function (e) {
    console.log(`点击了`, e.currentTarget.dataset.idx)
    var that = this;
    that.setData({
      modelhidden: false,
      modelCode: e.currentTarget.dataset.code,
      modelCreateDate: e.currentTarget.dataset.createdate,
      modelNumber: e.currentTarget.dataset.number,
      modelAmount: e.currentTarget.dataset.amount,
      modelDate: e.currentTarget.dataset.date,
      modelSubmit_person: e.currentTarget.dataset.submit_person,
      modelNote: e.currentTarget.dataset.note,
      userCellId: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    //load user invoice list
    wx.request({
      url: 'https://wechat.yuboxuan.club/invoices/',
      header: {
        'content-type': 'application/json', // 默认值
        'sessionid': wx.getStorageSync('sessionID')
      },
      method: 'GET',
      success: res => {
        this.setData({
          invoiceList: res.data.invoiceList
        })
        console.log(res.data)
      }
    })
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