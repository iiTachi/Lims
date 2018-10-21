function authRequest (api, method, postData, cb) {
  var host = "http://123.56.40.112:8081"
  wx.showLoading({
    title: '',
  })
  wx.getStorage({
    key: 'userData',
    success: function(res) {
      wx.request({
        url: host + api,
        data: postData,
        header: {
          'content-type': 'application/json',
          'cookie': res.data.accessToken
        },
        method: method,
        success: function (res) {
          wx.hideLoading()
          var data = res.data
          if (data.code == 0) {
            return typeof cb == "function" && cb(data)
          } else if (data.code == 6) {
            wx.showModal({
              title: '登陆过期',
              content: data.exception,
              success: function (res) {
                wx.redirectTo({
                  url: '/pages/auth/login/login',
                })
              }
            })
          } else {
            wx.showToast({
              title: data.exception,
              icon: 'none'
            })
          }
        },
        fail: function () {
          wx.hideLoading()
          wx.showToast({
            title: '网络连接超时',
            icon: 'none'
          })
        }
      })
    }
  })
}

module.exports.authRequest = authRequest