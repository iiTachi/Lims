// pages/exercises/waterSamples/WaterSamples.js
var app = getApp()
var optionMapCombiningIdAndText = new Map()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: [
      {
        choice: -1,
        id: -1,
        stem: '',
        options: [
          {
            id: -1,
            text: '',
            answer: false
          },
          {
            id: -1,
            text: '',
            answer: false
          },
          {
            id: -1,
            text: '',
            answer: false
          }
        ]
      },
      {
        choice: -1,
        id: -1,
        stem: '',
        options: [
          {
            id: -1,
            text: '',
            answer: false
          },
          {
            id: -1,
            text: '',
            answer: false
          },
          {
            id: -1,
            text: '',
            answer: false
          }
        ]
      },
      {
        choice: -1,
        id: -1,
        stem: '',
        options: [
          {
            id: -1,
            text: '',
            answer: false
          },
          {
            id: -1,
            text: '',
            answer: false
          },
          {
            id: -1,
            text: '',
            answer: false
          }
        ]
      }
    ],
    exercise_num: 1,
    button_pre: '上一题',
    button_next: '下一题',
    post_exercise_id: [-1, -1, -1],
    post_option_id: [-1, -1, -1],
    train_item_id: -1,
    final_answer: [
      {
        id: -1,
        choice: -1
      },
      {
        id: -1,
        choice: -1
      },
      {
        id: -1,
        choice: -1
      },     
    ],
    transmisson_data: [ //传输到提交结果页的数据
      {
        stem: '',
        your_answer: '',
        correct_answer: '',
        is_correct: false
      },
      {
        stem: '',
        your_answer: '',
        correct_answer: '',
        is_correct: false
      },
      {
        stem: '',
        your_answer: '',
        correct_answer: '',
        is_correct: false
      }
    ],
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
      "size": 3
    }
    var that = this
    app.functions.authRequest('/app/smell/training/start', 'POST', postData, function (res) {
      console.log(res.data)
      var newExercise = that.data.exercise
      var length = res.data.questions.length
      console.log("ri ", res.data.questions[0].choice)
      for(var i = 0; i < length; i++){
        newExercise[i].choice = res.data.questions[i].choice
        newExercise[i].id = res.data.questions[i].id
        newExercise[i].stem = res.data.questions[i].stem
        var size = res.data.questions[i].options.length
        for(var j = 0; j < size; j++){
          newExercise[i].options[j].id = res.data.questions[i].options[j].id
          newExercise[i].options[j].text = res.data.questions[i].options[j].option
          newExercise[i].options[j].answer = res.data.questions[i].options[j].answer
        }
      }
      var postExerciseId = that.data.post_exercise_id
      for(var i = 0; i < length; i++){
        postExerciseId[i] = newExercise[i].id
      }
      that.setData({
        exercise: newExercise,
        post_exercise_id: postExerciseId,
        train_item_id: itemId
      })
      console.log('题目 ', that.data)
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          optionMapCombiningIdAndText.set(that.data.exercise[i].options[j].id, that.data.exercise[i].options[j].text)
        }
      }
      console.log('map test ', optionMapCombiningIdAndText.get(287))
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
    var lastAnswer = postOptionId[exerciseNum-2]

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
      for (var i = 0; i < 3; i++) {
        newExercise[exerciseNum-2].options[i].checked = false
      }
      console.log(lastAnswer, '+', (newExercise[0].options))
      for(var i = 0; i < 3; i++){
        if (newExercise[exerciseNum - 2].options[i].id == lastAnswer){
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
      if (exerciseNum == 3) {
        var that = this
        wx.showModal({
          title: '这是最后一道题了',
          content: '开始计算分数',
          success: function (res) {
            if (res.confirm) {
              // 数据传至服务器端
              var answer = that.data.final_answer
              for (var i = 0; i < 3; i++) {
                answer[i].id = parseInt(that.data.post_exercise_id[i])
                answer[i].choice = parseInt(that.data.post_option_id[i])
              }
              //数据传至下一界面（显示做题正确情况以及分数）
              var transmissionData = that.data.transmisson_data
              for (var i = 0; i < 3; i++){
                transmissionData[i].stem = that.data.exercise[i].stem
                transmissionData[i].your_answer = optionMapCombiningIdAndText.get(parseInt(that.data.post_option_id[i]))
                transmissionData[i].correct_answer = optionMapCombiningIdAndText.get(that.data.exercise[i].choice)
                if (transmissionData[i].your_answer == transmissionData[i].correct_answer){
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
        var newIdx = -1
        for (var i = 0; i < 3 ; i++) {
          newExercise[exerciseNum].options[i].checked = false
        }
        if (nextAnswer != -1) {
          for (var i = 0; i < 3; i++){
            if(newExercise[exerciseNum].options[i].id == nextAnswer){
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