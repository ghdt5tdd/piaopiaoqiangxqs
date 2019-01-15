// pages/point/point.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    logistics: [{
      'status': '在途中',
      'detail': [{
        location: '浙江丽水长深高速',
        longitude: "119.65",
        latitude: "29.08",
        direction: "西北",
        speed: "120",
        logdate: '2018-12-24',
        logtime: '08:56:23',
      }, {
        location: '浙江温州锦绣中城大厦',
        longitude: "120.70",
        latitude: "28.01",
        direction: "正北",
        speed: "80",
        logdate: '2018-12-24',
        logtime: '07:40:21',
      }],
    }, {
      'status': '起点',
      'detail': [{
        location: '浙江乐清物流网点发车',
        longitude: "120.93",
        latitude: "27.95",
        direction: "西北",
        speed: "80",
        logdate: '2018-12-24',
        logtime: '06:58:37',
      }, ],
    }, ],


  },

  //查看实时定位
  toLoaction: function(e) {
    wx.navigateTo({
      url: '../location/location'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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