function getLocationInfo(){
  //获取位置信息
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log('location: ', res)
      var locationString = res.latitude + "," + res.longitude;
      // TODO
      wx.request({
        url: 'http://apis.map.qq.com/ws/geocoder/v1/',
        data: {
          "key": "UZJBZ-MZVE4-GWHUE-XKVNS-WZDSV-6NB7B",
          "location": locationString
        },
        method: 'GET',
        success: function (r) {
          //r.data.result.address获得的就是用户的位置信息
          var locationObject = {
            address: r.data.result.address,
            latitude: res.latitude,
            longitude: res.longitude
          }
          console.log('用户位置信息', locationObject);
          wx.setStorageSync('locationInfo', locationObject)
        }
      });
    },
  })
}

module.exports.getLocationInfo = getLocationInfo