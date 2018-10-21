// pages/exercises/UPSIT/UPSIT.js
var app = getApp()
var optionMapCombiningIdAndText = new Map()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: [],
    exercise_num: 1,
    button_pre: '上一题',
    button_next: '下一题',
    post_exercise_id: [],
    post_option_id: [],
    train_item_id: -1,
    final_answer: [],
    transmission_data: [],
    idx: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var itemId = wx.getStorageSync('trainItemId')
    console.log(itemId)
    var postData = {
      "trainingItemId": itemId,
      "size": 40
    }
    var that = this
    app.functions.authRequest('/app/smell/training/start', 'POST', postData, function (res) {
      console.log(res.data)
      //初始化各项数据
      var postExerciseId = that.data.post_exercise_id
      var postOptionId = that.data.post_option_id
      var finalAnswer = that.data.final_answer
      var trasmissionData = that.data.transmission_data
      for (var i = 0; i < 40; i++) {
        postExerciseId.push(res.data.questions[i].id)
        postOptionId.push(-1)
        finalAnswer.push(
          {
            id: -1,
            choice: -1
          }
        )
        trasmissionData.push(
          {
            stem: '',
            your_answer: '',
            correct_answer: '',
            is_correct: false
          }
        )
      }
      that.setData({
        exercise: res.data.questions,
        post_exercise_id: postExerciseId,
        post_option_id: postOptionId,
        final_answer: finalAnswer,
        transmission_data: trasmissionData,
        train_item_id: itemId
      })
      console.log('exercise', that.data.exercise)
      //将选项id和选项内容做映射
      for(var i = 0; i < 40; i++){
        for(var j = 0; j < 4; j++){
          optionMapCombiningIdAndText.set(that.data.exercise[i].options[j].id, that.data.exercise[i].options[j].option)
        }
      }
      console.log('data ', that.data)
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
  preExercise: function () {
    var postOptionId = this.data.post_option_id
    var exerciseNum = this.data.exercise_num
    var lastAnswer = postOptionId[exerciseNum - 2]

    if (exerciseNum == 1) {
      wx.showToast({
        title: '这是第一道题了',
        icon: 'none'
      })
    }
    else {
      //上一题必定是已经被选择过的
      var newExercise = this.data.exercise
      var newIdx = -1
      for (var i = 0; i < 4; i++) {
        newExercise[exerciseNum - 2].options[i].checked = false
      }
      console.log(lastAnswer, '+', (newExercise[0].options))
      for (var i = 0; i < 4; i++) {
        if (newExercise[exerciseNum - 2].options[i].id == lastAnswer) {
          newExercise[exerciseNum - 2].options[i].checked = true
          newIdx = lastAnswer
        }
      }
      this.setData({
        exercise_num: exerciseNum - 1,
        exercise: newExercise,
        idx: newIdx
      })
    }
  },

  /**
   *  下一题
   */
  nextExercise: function () {
    var postOptionId = this.data.post_option_id
    var exerciseNum = this.data.exercise_num
    var currentAnswer = postOptionId[exerciseNum - 1]

    if (currentAnswer == -1) {
      wx.showToast({
        title: '您还没有做出选择',
        icon: 'none'
      })
    }
    else {
      if (exerciseNum == 40) {
        var that = this
        wx.showModal({
          title: '这是最后一道题了',
          content: '开始计算分数',
          success: function (res) {
            if (res.confirm) {
              // 数据传至服务器端
              var answer = that.data.final_answer
              for (var i = 0; i < 40; i++) {
                answer[i].id = parseInt(that.data.post_exercise_id[i])
                answer[i].choice = parseInt(that.data.post_option_id[i])
              }
              //数据传至下一界面（显示做题正确情况以及分数）
              var transmissionData = that.data.transmission_data
              //console.log('cnm', transmissionData)
              for (var i = 0; i < 40; i++) {
                transmissionData[i].stem = that.data.exercise[i].stem
                transmissionData[i].your_answer = optionMapCombiningIdAndText.get(parseInt(that.data.post_option_id[i]))
                transmissionData[i].correct_answer = optionMapCombiningIdAndText.get(that.data.exercise[i].choice)
                if (transmissionData[i].your_answer == transmissionData[i].correct_answer) {
                  transmissionData[i].is_correct = true
                }
              }
              console.log('transmission_data', transmissionData)
              wx.setStorageSync('transmission_data', transmissionData)
              //console.log(answer)
              app.functions.getLocationInfo()
              var location = wx.getStorageSync('locationInfo').address
              console.log('location test', location)
              var postData = {
                "trainingItemId": that.data.train_item_id,
                "location": location,
                "answers": answer
              }
              app.functions.authRequest('/app/smell/training/end', 'POST', postData, function (res) {
                console.log(res)
                wx.setStorageSync('score', res.data.score)
                wx.showToast({
                  title: '分数上传成功',
                  icon: 'success'
                })
              })
              //提交成功后需将当前做题页面出栈，所以使用redirectTo
              wx.redirectTo({
                url: '/pages/exercises/completeExercise/completeExercise',
              })
            }
          }
        })
      }
      else {
        //判断下一题是否已经被选择过
        var nextAnswer = postOptionId[exerciseNum]
        var newExercise = this.data.exercise //该变量是为了改变下一题选项的选中(checked)状态
        var newIdx = -1;
        for (var i = 0; i < 4; i++) {
          newExercise[exerciseNum].options[i].checked = false
        }
        if (nextAnswer != -1) {
          for (var i = 0; i < 4; i++) {
            if (newExercise[exerciseNum].options[i].id == nextAnswer) {
              newExercise[exerciseNum].options[i].checked = true
              newIdx = nextAnswer
            }
          }
        }
        this.setData({
          exercise_num: exerciseNum + 1,
          exercise: newExercise,
          idx: newIdx
        })
      }
    }
  },


  /**
  *  改变选项时的操作 
  */
  radioChange: function (e) {
    var radioValue = e.detail.value
    var postOptionId = this.data.post_option_id
    var exerciseNum = this.data.exercise_num
    postOptionId[exerciseNum - 1] = radioValue
    this.setData({
      post_option_id: postOptionId,
      idx: radioValue
    })
    console.log('change value is ', this.data.post_option_id)
  },

})