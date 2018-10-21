const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userData',
      success: function(res) {
        that.setData({
          userData: res.data
        })
      }
    })
  },

  /**
   * 修改密码
   */
  changePsd: function () {
    wx.showToast({
      title: '该功能正在完善，敬请期待',
      icon: 'none'
    })
  },

  /**
   * 修改用户信息
   */
  changeUser: function () {
    wx.navigateTo({
      url: '/pages/auth/update/update',
    })
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
    this.onLoad()
    wx.stopPullDownRefresh()
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