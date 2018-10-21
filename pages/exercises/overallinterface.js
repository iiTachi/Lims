// pages/exercises/overallinterface.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [
      {
        text: '双醚 强度训练 上海南方中心', 
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '二甲基三硫醚 强度训练 上海南方中心',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '2-甲基异莰醇 强度训练 上海南方中心',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '双(2-氯异丙基) 醚嗅阀值测试-上海南方中心',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '二甲基二硫醚嗅阀值测试-上海南方中心',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '己醛嗅阀值测试-上海南方中心',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '土臭素嗅阀值测试-上海南方中心',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: 'MIB嗅阀值测试-上海南方中心',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '嗅味强度练习',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '不同水样辨认',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: '嗅味类型评价',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {  
        text: '嗅阀值评价',
        description: '',
        trainItemId: -1,
        questionType: ''
      },
      {
        text: 'UPSIT嗅味测试簿调查',
        description: '',
        trainItemId: -1,
        questionType: ''
      }
    ],
    textGuide8: '方法介绍：此训练课程用以学习如何确定嗅味物质不同浓度条件下的强度等级。训练时，给定测试员一定时间进行闻测记忆指定强度的嗅味样品，再对另外几瓶未知强度等级的样品进行闻测，一强化测试员对嗅味标准品的强度记忆。',
    textGuide10: '方法介绍：至少五人一组，室温下闻测后记下相应味道特征的最佳描述，如果描述有困难时，可参照已知标准品的相应味道，测试结束后再开发讨论，并告知相应的味道。对描述有差异的味道，须经讨论后取得所有测试员对相同物质的共同描述',
    modalHidden: true //是否隐藏对话框
  },

  /**
     * Button点击事件监听
     */
  Button: function (e) {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },

  // button点击（嗅味强度练习）
  Button0: function () {
    var that = this
    wx.showModal({
      title: that.data.title[0].text,
      content: that.data.title[0].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[0].trainItemId)
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

  // button点击（嗅味强度练习）
  Button1: function () {
    var that = this
    wx.showModal({
      title: that.data.title[1].text,
      content: that.data.title[1].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[1].trainItemId)
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

  // button点击（嗅味强度练习）
  Button2: function () {
    var that = this
    wx.showModal({
      title: that.data.title[2].text,
      content: that.data.title[2].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[2].trainItemId)
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

  // button点击（嗅味强度练习）
  Button3: function () {
    var that = this
    wx.showModal({
      title: that.data.title[3].text,
      content: that.data.title[3].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[3].trainItemId)
          wx.navigateTo({
            url: '/pages/exercises/snifferThreshold/SnifferThreshold',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  // button点击（嗅味强度练习）
  Button4: function () {
    var that = this
    wx.showModal({
      title: that.data.title[4].text,
      content: that.data.title[4].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[4].trainItemId)
          wx.navigateTo({
            url: '/pages/exercises/snifferThreshold/SnifferThreshold',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  // button点击（嗅味强度练习）
  Button5: function () {
    var that = this
    wx.showModal({
      title: that.data.title[5].text,
      content: that.data.title[5].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[5].trainItemId)
          wx.navigateTo({
            url: '/pages/exercises/snifferThreshold/SnifferThreshold',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  // button点击（嗅味强度练习）
  Button6: function () {
    var that = this
    wx.showModal({
      title: that.data.title[6].text,
      content: that.data.title[6].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[6].trainItemId)
          wx.navigateTo({
            url: '/pages/exercises/snifferThreshold/SnifferThreshold',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  // button点击（嗅味强度练习）
  Button7: function () {
    var that = this
    wx.showModal({
      title: that.data.title[7].text,
      content: that.data.title[7].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[7].trainItemId)
          wx.navigateTo({
            url: '/pages/exercises/snifferThreshold/SnifferThreshold',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  // button点击（嗅味强度练习）
  Button8: function () {
    var that = this
    wx.showModal({
      title: that.data.title[8].text,
      content: that.data.title[8].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[8].trainItemId)
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

  // button点击（不同水样辨认）
  Button9: function (){
    var that = this
    wx.showModal({
      title: that.data.title[9].text,
      content: that.data.title[9].description,
      confirmText: '开始答题',
      success: function (res) {
        if(res.confirm){
          wx.setStorageSync('trainItemId', that.data.title[9].trainItemId)
          wx.navigateTo({
            url: '/pages/exercises/waterSamples/WaterSamples',
          })
        }
        else if(res.cancel){
          console.log('cancel')
        }
      }
    })
  },

  // button点击（嗅味类型评价）
  Button10: function () {
    var that = this
    wx.showModal({
      title: that.data.title[10].text,
      content: that.data.title[10].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[10].trainItemId)
          wx.navigateTo({
            url: '/pages/select_onchange/select_onchange_without_intensity/select_onchange',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  // button点击（嗅味强度练习）
  Button11: function () {
    var that = this
    wx.showModal({
      title: that.data.title[11].text,
      content: that.data.title[11].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[11].trainItemId)
          wx.navigateTo({
            url: '/pages/exercises/snifferThreshold/SnifferThreshold',
          })
        }
        else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },

  // button点击（UPSIT嗅味测试簿调查）
  Button12: function () {
    var that = this
    wx.showModal({
      title: that.data.title[12].text,
      content: that.data.title[12].description,
      confirmText: '开始答题',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('trainItemId', that.data.title[12].trainItemId)
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

  // 开始答题 按钮点击事件(嗅味强度练习)
  confirm8: function () {
    wx.navigateTo({
      url: '/pages/select_onchange/select_onchange_with_intensity/select_onchange_intensity',
    })
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },

  // 开始答题 按钮点击事件(不同水样辨认)
  confirm9: function () {
    wx.navigateTo({
      url: '/pages/exercises/waterSamples/WaterSamples',
    })
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },

  // 开始答题 按钮点击事件(嗅味类型评价)
  confirm10: function () {
    wx.navigateTo({
      url: '/pages/select_onchange/select_onchange_without_intensity/select_onchange',
    })
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postData = {
      "trainingType": "嗅味层次分析法训练"
    }
    var that = this
    app.functions.authRequest('/app/smell/training/item/list', 'POST', postData, function(res) {
      console.log(res.data)
      var newTitle = that.data.title
      var length = res.data.length
      for(var i = 0; i < length; i++){
        newTitle[i].text = res.data[i]["title"]
        newTitle[i].description = res.data[i]["description"]
        newTitle[i].trainItemId = res.data[i]["id"]
        newTitle[i].questionType = res.data[i]["questionType"]
      }
      that.setData({
        title: newTitle
      })
      console.log("new title ", that.data.title)
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