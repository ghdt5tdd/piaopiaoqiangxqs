// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: "../../images/near.jpg",
    hide: true,
    hideCoupon: true,
  },

  //打开红包弹窗
  showCoupon: function(e) {
    this.setData({
      couponAmount: "10", 
      couponLimit: "", //无限制数据就是无使用门槛红包
      hideCoupon: false,
      hide: false,
    })
  },

  //关闭弹窗
  hide: function(e) {
    this.setData({
      hideCoupon: true,
      hide: true,
    })
  },

  //领取红包
  hideCoupon: function(e) {
    this.setData({
      hideCoupon: true,
      hide: true,
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