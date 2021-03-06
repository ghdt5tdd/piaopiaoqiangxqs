// pages/punchLocation/punchLocation.js
// 引入SDK核心类
var QQMapWX = require('../qqmap/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'I5GBZ-ZQULP-6MTD5-L4RVA-XAPAJ-DKB4G' // 必填 换成自己申请到的
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    currentLat: '',
    currentLon: '',
    markers: []
  },

  /**
   * 地图
   */
  getCurrentLocation: function() {
    var that = this;
    wx.getLocation({
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log('location', res)
        that.setData({
          currentLat: latitude,
          currentLon: longitude,
          markers: [{
            latitude: latitude,
            longitude: longitude
          }]
        })
        that.configMap();
      },
    })
  },

  configMap: function() {
    var that = this;

    var qqmapsdk = new QQMapWX({
      key: 'I5GBZ-ZQULP-6MTD5-L4RVA-XAPAJ-DKB4G'
    });
    // 调用接口
    console.log('---讲纬度', that.data.currentLat);
    qqmapsdk.search({
      keyword: '超市',
      location: {
        latitude: that.data.currentLat,
        longitude: that.data.currentLon
      },
      success: function(res) {
        console.log('qqmap_success', res);
      },
      fail: function(res) {
        console.log('qqmap_fail', res);
      },
      complete: function(res) {
        console.log('qqmap_complete', res);
        that.setData({
          addressList: res.data
        })
      }
    });


  },

  //点击地址
  didSelectCell: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.id
    var locationData = that.data.addressList[index]
    // var locationStr = locationData.location;
    var latitude = locationData.location.lat; //locationStr.split(',')[0]
    var longitude = locationData.location.lng; //locationStr.split(',')[1]

    //点击选择的地址
    var punchLocation = locationData.ad_info.province + ',' + locationData.ad_info.city + ',' + locationData.ad_info.district + ',' + locationData.title
    var location = longitude + ',' + latitude //经纬度

    console.log(punchLocation, location)

    var locationDic = {
      'latitude': latitude,
      'longitude': longitude
    };

    wx.navigateBack({
      //返回定位签到页面，同时签到页面punch数组添加新的第几次签到、签到地址、签到时间数据
      delta: 1
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCurrentLocation()
    // this.configMap()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})