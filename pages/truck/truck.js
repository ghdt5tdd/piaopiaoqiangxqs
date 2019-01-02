// pages/truck/truck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: "../../images/map.jpg",
    plates: "沪123456",
    speed: "80",
    location: "浙江金华长深高速",
    direction: "东北",
    time: "2018-12-24 08:56:23",
    hideInfo: false
  },



  hide: function(e) {
    this.setData({
      hideInfo: true
    })
  },

  show: function(e) {
    this.setData({
      hideInfo: false
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