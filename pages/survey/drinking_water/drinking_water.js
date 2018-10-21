// pages/survey/drinking_water/drinking_water.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: [
      {value: '0', name: '我非常高兴以这种水作为每天的饮用水'},
      {value: '1', name: '我高兴以这种水作为每天的饮用水'},
      {value: '2', name: '我确定可以接受这种水作为每天的饮用水'},
      {value: '3', name: '我能够接受这种水作为每天的饮用水'},
      {value: '4', name: '也许我可以接受这种水作为每天的饮用水'},
      {value: '5', name: '我认为我不能接受这种水作为每天的饮用水'},
      {value: '6', name: '我不能接受这种水作为每天的饮用水'},
      {value: '7', name: '我永远不会接受这种水作为每天的饮用水'},
      {value: '8', name: '不能忍受将这种水放进嘴里，并且我永远不会喝它'}
    ],
    title: ['题目1：您对该水样的评价为：', '题目2：您对该水样的感官评价为：'],
    button_pre: '上一题',
    button_next: '下一题',
    exercise_num: 1,
    radio: 'option-radio-unchecked',
    radio_value: -1,
    post_value: [-1, -1],
    exercise_id: [-1, -1], //题目id，再页面onLoad时从服务器端获取数据
    final_answer: [
      {
        id: -1,
        num: -1
      },
      {
        id: -1,
        num: -1
      }
    ],
    location: '',
    idx: -1 //控制选中项变色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var itemId = wx.getStorageSync('trainItemId')
    console.log('itemId is ', itemId)
    var postData = {
      "trainingItemId": itemId,
      "size": 2
    }
    //初始化题目id
    var that = this
    app.functions.authRequest('/app/smell/training/start', 'POST', postData, function (res) {
      console.log(res)
      var exerciseId = that.data.exercise_id
      exerciseId[0] = res['data']['questions'][0]['id']
      exerciseId[1] = res['data']['questions'][1]['id']
      exerciseId.sort()
      that.setData({
        exercise_id: exerciseId
      })
      console.log("test ", that.data.exercise_id)
      
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

  },

  /**
  *  上一题
  */
  preExercise: function(){
    var postValue = this.data.post_value
    var exerciseNum = this.data.exercise_num
    var lastAnswer = postValue[exerciseNum - 2]

    if(exerciseNum == 1){
      wx.showToast({
        title: '这是第一道题了',
        icon: 'none'
      })
    }
    else{
      //上一题必定是已经被选择过的
      var newOption = this.data.option
      var newIdx = -1
      for(var i = 0; i < 9; i++){
        newOption[i].checked = false
      }
      newOption[lastAnswer].checked = true
      newIdx = lastAnswer
      this.setData({
        exercise_num: exerciseNum - 1,
        option: newOption,
        idx: lastAnswer
      })
    }
  },

  /**
   *  下一题
   */
  nextExercise: function() {
    var postValue = this.data.post_value
    var exerciseNum = this.data.exercise_num
    var currentAnswer = postValue[exerciseNum-1]
    
    if(currentAnswer == -1){
      wx.showToast({
        title: '您还没有做出选择',
        icon: 'none'
      })
    }
    else{
      if(exerciseNum == 2){
        var that = this
        wx.showModal({
          title: '这是最后一道题了',
          content: '是否提交调查结果',
          success: function(res) {
            if(res.confirm){
              // 数据传至服务器端
              var answer = that.data.final_answer
              for(var i = 0; i < 2; i++){
                answer[i].id = that.data.exercise_id[i]
                answer[i].num = parseInt(that.data.post_value[i])
              }
              console.log(answer)
              app.functions.getLocationInfo()
              var location = wx.getStorageSync('locationInfo').address
              console.log('11loaction ', location)
              var postData = {
                "trainingItemId": 3,
                "location": location,
                "answers": answer
              }
              app.functions.authRequest('/app/smell/training/end', 'POST', postData, function (res){
                wx.showToast({
                  title: '提交数据成功',
                  icon: 'success'
                })
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
      else{
        //判断下一题是否已经被选择过
        var nextAnswer = postValue[exerciseNum]
        var newOption = this.data.option //该变量是为了改变下一题选项的选中(checked)状态
        var newIdx = -1
        for(var i = 0; i < 9; i++){
          newOption[i].checked = false
        }
        if(nextAnswer != -1){
          newOption[nextAnswer].checked = true
          newIdx = nextAnswer
        }
        this.setData({
          exercise_num: exerciseNum+1,
          option: newOption,
          idx: newIdx
        })
      }
    }
  },

  /**
  *  改变选项时的操作 
  */
  radioChange: function(e) {
    var radioValue = e.detail.value
    var postValue = this.data.post_value
    var exerciseNum = this.data.exercise_num
    postValue[exerciseNum-1] = radioValue
    this.setData({
      idx: radioValue,
      post_value: postValue
    })
    console.log('mmm', this.data.idx)
    console.log('change value is ', this.data.post_value)
  }
})