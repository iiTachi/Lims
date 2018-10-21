// pd/pd.js
var app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    msg6:{
      type: String,
      value: '1'
    },
    msg7: {
      type: String,
      value: '2'
    },
    msg8:{
      type: String,
      value: '3'
    },
    array_fromApi:{
      type: Array,
      value: null
    },
    array1:{
      type: Array,
      value: null
    },
    array20:{
      type: Array,
      value: null
    },
    array21: {
      type: Array,
      value: null
    },
    array22: {
      type: Array,
      value: null
    },
    array23: {
      type: Array,
      value: null
    },
    array24: {
      type: Array,
      value: null
    },
    array25: {
      type: Array,
      value: null
    },
    array26: {
      type: Array,
      value: null
    },
    array27: {
      type: Array,
      value: null
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    hide: true,
    hide1: true,
    index: 0,
    array: [0, 2, 4, 6, 8, 10, 12],
    inputvalue: null,
    index1: 0,
    inputvalue1: null,
    hiddenmodalput1: true,
    voteTitle1: null,
    index2: 0,
    array2: [],
    // array20: [],
    // array21: ['氯味/臭氧味','自定义'],
    // array22: ['烟草味','鲜草味','干草味','木材味','自定义'],
    // array23: ['腐败味','臭鸡蛋味','腐烂蔬菜味','自定义'],
    // array24: ['腥味','鲜鱼味','臭鱼味','藻腥味','自定义'],
    // array25: ['水果味','香味','甜味','自定义'],
    // array26: ['药味','自定义'],
    // array27: ['汽油味','油漆味','塑料味','胶水味','自定义'],
    array28: ['自定义'],
    inputvalue2: null,
    hiddenmodalput2: true,
    voteTitle2: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    bindPickerChange: function (e) {
      var array_temp = this.data.array
      var temp = array_temp[e.detail.value]
      // 传输数据给页面
      var other_sub_type = null
      var other_type = null
      var type_id = null
      var sub_type = null
      if(this.data.index1 != this.data.array1.length-1){
        type_id = this.data.array_fromApi[this.data.index1].id
        if (this.data.index2 != this.data.array_fromApi[this.data.index1].sub_types.length) {
          sub_type = this.data.array_fromApi[this.data.index1].sub_types[this.data.index2].id
        }else{
          other_sub_type = this.data.inputvalue2
        }
      }else{
        other_type = this.data.inputvalue1
        other_sub_type = this.data.inputvalue2
      }
      var myEventDetail = {
        other_sub_type: other_sub_type,   //自定义二级嗅味类型
        other_type: other_type, //自定义一级嗅味类型
        strength: temp,  //嗅味强度
        sub_type: sub_type, //二级嗅味类型id
        type: type_id, //一级嗅味类型id
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail)
      
      this.setData({
        index: e.detail.value,
        inputvalue: temp,
      })
    },

    bindPickerChange1: function (e) {
      var array_temp = this.data.array1
      var temp = array_temp[e.detail.value]
      var temp1 = true
      if (e.detail.value == array_temp.length - 1) {
        temp1 = false
      }
      var array_temp1 = this.data.array2
      switch (e.detail.value) {
        case '0': array_temp1 = this.data.array20; break;
        case '1': array_temp1 = this.data.array21; break;
        case '2': array_temp1 = this.data.array22; break;
        case '3': array_temp1 = this.data.array23; break;
        case '4': array_temp1 = this.data.array24; break;
        case '5': array_temp1 = this.data.array25; break;
        case '6': array_temp1 = this.data.array26; break;
        case '7': array_temp1 = this.data.array27; break;
        case '8': array_temp1 = this.data.array28; break;
      }
      this.data.array2 = array_temp1
      var myEventDetail = {
        other_sub_type: null,   //自定义二级嗅味类型
        other_type: null, //自定义一级嗅味类型
        strength: null,  //嗅味强度
        sub_type: null, //二级嗅味类型id
        type: null, //一级嗅味类型id
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail)
      this.setData({
        hide: false,
        index1: e.detail.value,
        inputvalue1: temp,
        hiddenmodalput1: temp1,
        array2: array_temp1,
        inputvalue: null,
        inputvalue2: null,
        hide1: true
      })
    },

    bindPickerChange2: function (e) {
      var v = this.data.index1
      var array_temp = this.data.array2
      var temp = array_temp[e.detail.value]
      var temp1 = true
      if (e.detail.value == array_temp.length-1) {
        temp1 = false
      }
      var myEventDetail = {
        other_sub_type: null,   //自定义二级嗅味类型
        other_type: null, //自定义一级嗅味类型
        strength: null,  //嗅味强度
        sub_type: null, //二级嗅味类型id
        type: null, //一级嗅味类型id
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail)
      this.setData({
        index2: e.detail.value,
        inputvalue2: temp,
        hiddenmodalput2: temp1,
        hide1: false,
        inputvalue: null
      })
    },

    withoutOne: function () {
      if(this.data.hide == true || this.data.inputvalue1 == null){
        wx.showToast({
          title: '先选择一级嗅味类型',
          icon:'none'
        })
      }
    },
    withoutTwo: function () {
      if(this.data.hide1 == true || this.data.inputvalue2 == null){
        wx.showToast({
          title: '先选择二级嗅味类型',
          icon: 'none'
        })
      }
    },

    voteTitle1: function (e) {
      this.data.voteTitle1 = e.detail.value;
    },

    voteTitle2: function (e) {
      this.data.voteTitle2 = e.detail.value;
    },

    cancel1: function () {
      this.setData({
        hiddenmodalput1: true,
        inputvalue1: null,
        hide: true
      });
    },

    cancel2: function () {
      this.setData({
        hiddenmodalput2: true,
        inputvalue2: null,
        hide1: true
      });
    },

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

  }
})
