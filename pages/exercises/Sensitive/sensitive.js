// pages/exercises/Sensitive/sensitive.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   // text: '饮用水喜好调查',
   //text1: '物质浓度-嗅味强度效应曲线',
    //text2: 'UPSIT嗅味测试簿调查',
   // textGuide: '方法介绍：该方法主要通过测试者提供的喜好得分来评估消费者对饮用水感官特征的态度。',
    trainItemId: [0 , 0 , 0],
    title: ["饮用水嗅味喜好调查", "物质浓度-嗅味强度效应曲线", "UPSIT嗅味测试簿调查"],
    textGuide: ["", "", ""],
    questionType: ["", "", ""],
    modalHidden: true //是否隐藏对话框
  },

  /**
     * drinkingButton点击事件监听
     */
  drinkingButton: function (e) {
    var that = this
    wx.showModal({
      title: this.data.title[0],
      content: this.data.textGuide[0],
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.trainItemId[0])
          wx.navigateTo({
            url: '/pages/survey/drinking_water/drinking_water',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  /**
     * materialButton点击事件监听
     */
  materialButton: function (e) {
    var that = this
    wx.showModal({
      title: this.data.title[1],
      content: this.data.textGuide[1],
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.trainItemId[1])
          wx.navigateTo({
            url: '/pages/select_onchange/select_onchange_with_intensity/select_onchange_intensity',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  /**
     * upsitButton点击事件监听
     */
  upsitButton: function (e) {
    var that = this
    wx.showModal({
      title: this.data.title[2],
      content: this.data.textGuide[2],
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.trainItemId[2])
          wx.navigateTo({
            url: '/pages/exercises/UPSIT/UPSIT',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postData = {
      "trainingType": "嗅味敏感性调查"
    }
    var that = this
    app.functions.authRequest('/app/smell/training/item/list', 'POST', postData, function (res) {
      console.log(res)
      var trainItemId = that.data.trainItemId
      var title = that.data.title
      var description = that.data.textGuide
      var questionType = that.data.questionType
      for (var i = 0; i < 3; i++) {
        trainItemId[i] = res["data"][i]["id"]
        title[i] = res["data"][i]["title"]
        description[i] = res["data"][i]["description"]
        questionType[i] = res["data"][i]["questionType"]
      }
      that.setData({
        trainItemId: trainItemId,
        title: title,
        textGuide: description,
        questionType: questionType
      })
      console.log(that.data.title)
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