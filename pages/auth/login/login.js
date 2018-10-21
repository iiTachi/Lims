Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 'Lims'
  },

  /**
   * 登陆
   */
  login: function (e) {
    var postData = e.detail.value
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'http://123.56.40.112:8081/app/login',
      data: postData,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        var data = res.data
        if (data.code == 0) {
          wx.setStorage({
            key: 'userData',
            data: data.data,
            success: function (res) {
              wx.hideLoading()
              wx.showToast({
                title: '登陆成功'
              })
              wx.redirectTo({
                url: '/pages/exercises/FirstPage/firstPage',
              })
            },
            fail: function () {
              wx.hideLoading()
              wx.showToast({
                title: '网络连接超时',
                icon: 'none'
              })
            }
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: data.exception,
            icon: 'none'
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '网络连接超时',
          icon: 'none'
        })
      }
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