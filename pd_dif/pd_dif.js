// pd_dif/pd_dif.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    msg6: {
      type: String,
      value: '1'
    },
    msg7: {
      type: String,
      value: '2'
    },
    msg8: {
      type: String,
      value: '3'
    },
    array_fromApi: {
      type: Array,
      value: null
    },
    array1: {
      type: Array,
      value: null
    },
    array20: {
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
    inputvalue1: {
      type: String,
      value: null
    },
    inputvalue2: {
      type: String,
      value: null
    },
    inputvalue:{
      type: String,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hide: true,
    hide1: true,
    index: 0,
    array: [0, 2, 4, 6, 8, 10, 12],
    index1: 0,
    hiddenmodalput1: true,
    voteTitle1: null,
    index2: 0,
    array2: [],
    hiddenmodalput2: true,
    voteTitle2: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    bindPickerChange: function(e) {
        var array_temp = this.data.array
        var temp = array_temp[e.detail.value]
        // 传输数据给页面
        var other_type = null
        var type_id = null
        var sub_type = null
        if (this.data.index1 != this.data.array1.length - 1) {
            type_id = this.data.array_fromApi[this.data.index1].id
            if (this.data.index2 != this.data.array_fromApi[this.data.index1].sub_types.length) {
                sub_type = this.data.array_fromApi[this.data.index1].sub_types[this.data.index2].id
            }
        } else {
            other_type = this.data.inputvalue1
        }
        var myEventDetail = {
            type_text: this.data.inputvalue1,
            sub_type_text: this.data.inputvalue2,
            otherType: other_type, //自定义一级嗅味类型
            strength: temp, //嗅味强度
            subtype: sub_type, //二级嗅味类型id
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
      var temp2 = false
      var temp3 = null
      if (e.detail.value == array_temp.length - 1) {
        temp1 = false
        temp2 = true
        temp3 = ' '

      }
      var array_temp1 = this.data.array2
      switch (e.detail.value) {
        case '0':
          array_temp1 = this.data.array20;
          break;
        case '1':
          array_temp1 = this.data.array21;
          break;
        case '2':
          array_temp1 = this.data.array22;
          break;
        case '3':
          array_temp1 = this.data.array23;
          break;
        case '4':
          array_temp1 = this.data.array24;
          break;
        case '5':
          array_temp1 = this.data.array25;
          break;
        case '6':
          array_temp1 = this.data.array26;
          break;
        case '7':
          array_temp1 = this.data.array27;
          break;
      }
      this.data.array2 = array_temp1
      this.setData({
        hide: temp2,
        index1: e.detail.value,
        inputvalue1: temp,
        hiddenmodalput1: temp1,
        array2: array_temp1,
        inputvalue: null,
        inputvalue2: temp3,
        hide1: temp1
      })
    },

    bindPickerChange2: function (e) {
      var v = this.data.index1
      var array_temp = this.data.array2
      var temp = array_temp[e.detail.value]
      var temp1 = true
      if (e.detail.value == array_temp.length - 1) {
        temp1 = false
      }
      // // 传输数据给页面
      // var type_id = null
      // var sub_type_id = null
      // type_id = this.data.array_fromApi[this.data.index1].id
      // sub_type_id = this.data.array_fromApi[this.data.index1].sub_types[e.detail.value].id
      // var myEventDetail = {
      //   type_text: this.data.inputvalue1,
      //   sub_type_text: temp,
      //   otherType: null,
      //   sub_type: sub_type_id, //二级嗅味类型id
      //   type: type_id, //一级嗅味类型id
      // } // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('myevent', myEventDetail)
      this.setData({
        index2: e.detail.value,
        inputvalue2: temp,
        hiddenmodalput2: temp1,
        inputvalue: null,
        hide1: false,
      })
    },

    withoutOne: function () {
      if (this.data.hide == true && this.data.index1 != this.data.array1.length - 1) {
        wx.showToast({
          title: '先选择一级嗅味类型',
          icon: 'none'
        })
      }
    },

    withoutTwo: function () {
      if (this.data.hide1 == true || this.data.inputvalue2 == null || this.data.inputvalue1==null||this.data.inputvalue1=='') {
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
        hide: true,
        hide1: true
      });
    },

    cancel2: function () {
      this.setData({
        hiddenmodalput2: true,
        inputvalue2: null,
        hide1: true,
      });
    },

    confirm1: function () {
      // // 传输数据给页面
      // var myEventDetail = {
      //   otherType: this.data.voteTitle1,
      //   sub_type: null, //二级嗅味类型id
      //   type: null, //一级嗅味类型id
      // } // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('myevent', myEventDetail)
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