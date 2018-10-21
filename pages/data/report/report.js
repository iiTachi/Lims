// pages/data/report/report.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // msg1: '检测样编号',
    msg2: '检测对象',
    msg3: '供水系统位置',
    msg4: '水温',
    msg5:'地址',
    msg6:'嗅味类型',
    msg7:'二级嗅味类型',
    msg8: '嗅味强度',
    msg9: '添加嗅味类型',
    inputvalue1: null,
    hiddenmodalput1: true,
    voteTitle1: null,
    array1: [],
    array1_fromApi: [],
    index1: 0,
    inputvalue2: null,
    array2: [],
    array2_fromApi: [],
    index2: 0,
    voteTitle2: null,
    hiddenmodalput2: true,
    locationValue: '',
    checkbox: [-1],
    array3: [],
    array3_fromApi: [],
    array20: [],
    array20_fromApi: [],
    array21: [],
    array21_fromApi: [],
    array22: [],
    array22_fromApi: [],
    array23: [],
    array23_fromApi: [],
    array24: [],
    array24_fromApi: [],
    array25: [],
    array25_fromApi: [],
    array26: [],
    array26_fromApi: [],
    array27: [],
    array27_fromApi: [],
    array28: [],
    array28_fromApi: [],

// 上报用
    smell: [
      {
        other_sub_type: null,
        other_type: null,
        strength: null,
        sub_type: null,
        type: null,
      },
    ],
    location: {
      address:  null,  //地址
      latitude: 1.1,  //纬度
      longitude: 1.1, //经度
    },
  },

  bindPickerChange1: function (e) {
    var array_temp = this.data.array1
    var temp = array_temp[e.detail.value]
    var temp1 = true
    if (e.detail.value == this.data.array1.length-1) {
      temp1 = false
    }
    this.setData({
      index1: e.detail.value,
      inputvalue1: temp,
      hiddenmodalput1: temp1
    })
  },

  bindPickerChange2: function (e) {
    var array_temp = this.data.array2
    var temp = array_temp[e.detail.value]
    var temp1 = true
    if (e.detail.value == this.data.array2.length - 1) {
      temp1 = false
    }
    this.setData({
      index2: e.detail.value,
      inputvalue2: temp,
      hiddenmodalput2: temp1
    })
  },

// 获取对话框的内容
  voteTitle1: function (e) {
    this.data.voteTitle1 = e.detail.value;
  },
  voteTitle2: function (e) {
    this.data.voteTitle2 = e.detail.value;
  },

//取消按钮
  cancel1: function () {
    this.setData({
      hiddenmodalput1: true,
      inputvalue1: null
    });
  },
  cancel2: function () {
    this.setData({
      hiddenmodalput2: true,
      inputvalue2: null
    });
  },
//确认
  confirm1: function () {
    this.setData({
      hiddenmodalput1: true,
      inputvalue1: this.data.voteTitle1
    })
  },
  confirm2: function () {
    this.setData({
      hiddenmodalput2: true,
      inputvalue2: this.data.voteTitle2
    })
  },

// 添加嗅味类型
  addSmell: function (){
    var temp = this.data.checkbox
    var temp1 = this.data.smell
    if(this.data.smell[this.data.checkbox.length-1].strength == null){
      wx.showToast({
        title: '先填写完整以上内容',
        icon: 'none'
      })
    }else{
      temp.push(this.data.checkbox.length);
      temp1.push({
        other_sub_type: null,
        other_type: null,
        strength: null,
        sub_type: null,
        type: null,
      })
    }
    this.setData({
      checkbox: temp
    })
  },

  onMyevent: function(e){
    this.data.smell[this.data.checkbox.length-1]=e.detail
    console.log(this.data.smell)
  },

// form提交
  formSubmit: function (e) {
    console.log('formit携带:',e.detail.value)
    var other_object = null
    if(this.data.index1 == this.data.array1.length-1){
      other_object = this.data.inputvalue1
    }
    var other_ws_loc = null
    if(this.data.index2 == this.data.array2.length-1){
      other_ws_loc = this.data.inputvalue2
    }
    var object_id = null
    if(this.data.index1 != this.data.array1.length-1){
      object_id = this.data.array1_fromApi[this.data.index1].id
    }
    var ws_loc_id = null
    if(this.data.index2 != this.data.array2.length-1){
      ws_loc_id = this.data.array2_fromApi[this.data.index2].id
    }
    var postData = {
      "temperature": parseFloat(e.detail.value.temperature),
      "location": this.data.location,
      "object": object_id,
      "other_object": other_object,
      "ws_loc": ws_loc_id,
      "other_ws_loc": other_ws_loc,
      "smell": this.data.smell
    }
    console.log(postData)
    var smell_temp = true
    for(var i = 0; i < this.data.smell.length; i++){
      if(this.data.smell[i].strength == null){
        smell_temp = false
      }
    }
    if(this.data.inputvalue1==null ||this.data.inputvalue2==null||e.detail.value.temperature==''||this.data.locationValue==null||smell_temp==false){
      wx.showToast({
        title: '每一项内容不能为空',
        icon: 'none'
      })
    }else{
      console.log('提交了')
      // app.functions.authRequest('/app/smell/monitor/report', 'POST', postData, function (res) {
      //   console.log(res)
      // })
    }
  },

// 扫一扫
  // camera: function(){
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //     success: (res) => {
  //       console.log(res)
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.functions.authRequest('/app/smell/basicdata/list', 'GET', null, function (res) {
      console.log(res)
      that.data.array1_fromApi = res.data.objects
      that.data.array2_fromApi = res.data.ws_locs
      that.data.array3_fromApi = res.data.smell_types
      that.data.array20_fromApi = res.data.smell_types[0].sub_types
      that.data.array21_fromApi = res.data.smell_types[1].sub_types
      that.data.array22_fromApi = res.data.smell_types[2].sub_types
      that.data.array23_fromApi = res.data.smell_types[3].sub_types
      that.data.array24_fromApi = res.data.smell_types[4].sub_types
      that.data.array25_fromApi = res.data.smell_types[5].sub_types
      that.data.array26_fromApi = res.data.smell_types[6].sub_types
      that.data.array27_fromApi = res.data.smell_types[7].sub_types
      

      var array_temp = []
      for (var i = 0; i < that.data.array1_fromApi.length; i++){
        array_temp[i] = that.data.array1_fromApi[i].title
      }
      array_temp.push('自定义')

      var array_temp1 = []
      for (var i = 0; i < that.data.array2_fromApi.length; i++) {
        array_temp1[i] = that.data.array2_fromApi[i].title
      }
      array_temp1.push('自定义')

      var array_temp2 = []
      for (var i = 0; i < that.data.array3_fromApi.length; i++) {
        array_temp2[i] = that.data.array3_fromApi[i].title
      }
      array_temp2.push('自定义')

      var array_temp3 = []
      for (var i = 0; i < that.data.array20_fromApi.length; i++) {
        array_temp3[i] = that.data.array20_fromApi[i].title
      }
      array_temp3.push('自定义')

      var array_temp4 = []
      for (var i = 0; i < that.data.array21_fromApi.length; i++) {
        array_temp4[i] = that.data.array21_fromApi[i].title
      }
      array_temp4.push('自定义')

      var array_temp5 = []
      for (var i = 0; i < that.data.array22_fromApi.length; i++) {
        array_temp5[i] = that.data.array22_fromApi[i].title
      }
      array_temp5.push('自定义')

      var array_temp6 = []
      for (var i = 0; i < that.data.array23_fromApi.length; i++) {
        array_temp6[i] = that.data.array23_fromApi[i].title
      }
      array_temp6.push('自定义')

      var array_temp7 = []
      for (var i = 0; i < that.data.array24_fromApi.length; i++) {
        array_temp7[i] = that.data.array24_fromApi[i].title
      }
      array_temp7.push('自定义')

      var array_temp8 = []
      for (var i = 0; i < that.data.array25_fromApi.length; i++) {
        array_temp8[i] = that.data.array25_fromApi[i].title
      }
      array_temp8.push('自定义')

      var array_temp9 = []
      for (var i = 0; i < that.data.array26_fromApi.length; i++) {
        array_temp9[i] = that.data.array26_fromApi[i].title
      }
      array_temp9.push('自定义')

      var array_temp10 = []
      for (var i = 0; i < that.data.array27_fromApi.length; i++) {
        array_temp10[i] = that.data.array27_fromApi[i].title
      }
      array_temp10.push('自定义')

      app.functions.getLocationInfo()
      var loca = wx.getStorageSync('locationInfo').address
      var lati = wx.getStorageSync('locationInfo').latitude
      var longi = wx.getStorageSync('locationInfo').longitude

      that.setData({
        locationValue: loca,
        location: {
          address: loca,  //地址
          latitude: lati,  //纬度
          longitude: longi, //经度
        },
        array1: array_temp,
        array2: array_temp1,
        array3: array_temp2,
        array3_fromApi: res.data.smell_types,
        array20: array_temp3,
        array21: array_temp4,
        array22: array_temp5,
        array23: array_temp6,
        array24: array_temp7,
        array25: array_temp8,
        array26: array_temp9,
        array27: array_temp10,
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.pd = this.selectComponent("#pd");

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
