const util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {},
    gender: '',
    showRhinitisYear: '',
    showLastTrainingDate: '',
    birth: '',
    lastTrainingDate: ''
  },

  /**
   * 修改用户信息
   */
  update: function (e) {
    var postData = e.detail.value
    postData.gender = (postData.gender == 'true' ? true : false)
    postData.birth = Date.parse(postData.birth)
    postData.lastTrainingDate = Date.parse(postData.lastTrainingDate)
    var that = this
    app.functions.authRequest('/app/userinfo/update', 'POST', postData, function (res) {
      that.updateStorage(postData)
    })
  },

  updateStorage: function (postData) {
    this.data.userData.gender = postData.gender
    this.data.userData.birth = postData.birth
    this.data.userData.certId = postData.certId
    this.data.userData.city = postData.city
    this.data.userData.company = postData.company
    this.data.userData.profession = postData.profession
    this.data.userData.rhinitis = postData.rhinitis
    this.data.userData.rhinitisYear = postData.rhinitisYear
    this.data.userData.trained = postData.trained
    this.data.userData.lastTrainingDate = postData.lastTrainingDate
    wx.setStorage({
      key: 'userData',
      data: this.data.userData,
      success: function (e) {
        wx.showModal({
          title: '修改成功',
          content: '请在用户设置页下拉刷新个人信息',
          success: function (res) {
            wx.navigateBack({
              
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userData',
      success: function (res) {
        var userData = res.data
        that.setData({
          userData: userData,
          gender: userData.gender,
          showRhinitisYear: userData.rhinitis,
          showLastTrainingDate: userData.trained,
          birth: util.myFormatTime(new Date(userData.birth)),
          lastTrainingDate: util.myFormatTime(new Date(userData.lastTrainingDate))
        })
      }
    })
  },

  changeGender: function (e) {
    this.setData({
      gender: (e.detail.value == 'true' ? true : false)
    })
  },

  changeShowRhinitisYear: function (e) {
    this.setData({
      showRhinitisYear: e.detail.value
    })
  },

  changeShowLastTrainingDate: function (e) {
    this.setData({
      showLastTrainingDate: e.detail.value
    })
  },

  bindBirthChange: function (e) {
    this.setData({
      birth: e.detail.value
    })
  },

  bindlastTrainingDateChange: function (e) {
    this.setData({
      lastTrainingDate: e.detail.value
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