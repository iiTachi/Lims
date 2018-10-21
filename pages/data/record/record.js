const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isEmpty: true,
    page: 1,
    size: 12,
    showLoading: false,
    showLoadingComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showList()
  },

  showList: function () {
    var postData = {
      page: this.data.page,
      size: this.data.size
    }
    var that = this
    app.functions.authRequest('/app/smell/monitor/list', 'POST', postData, function (res) {
      var content = res.data.content
      if (content.length != 0) {
        for (var i = 0; i < content.length; i++) {
          content[i].createTime = util.formatTime(new Date(content[i].createTime))
        }
        that.setData({
          list: that.data.isEmpty ? content : that.data.list.concat(content),
          showLoading: true
        })
      } else {
        that.setData({
          showLoading: false,
          showLoadingComplete: true
        })
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
      }
    })
  },

  loadMore: function () {
    if (this.data.showLoading && !this.data.showLoadingComplete) {
      this.setData({
        page: this.data.page + 1,
        size: 6,
        isEmpty: false
      })
      this.showList()
    }
  },

  navigateToDetail: function (e) {
    var detail = e.currentTarget.dataset.detail
    wx.navigateTo({
      url: '/pages/data/detail/detail?detail=' + JSON.stringify(detail),
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