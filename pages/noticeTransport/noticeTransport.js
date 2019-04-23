// pages/noticeTransport/noticeTransport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    noticeItem: [{
      title: "物流通知",
      time: "2018-01-15 10:08",
      info: "您的货物已到达目的地，请注意接收",
      read: true,
    }, {
      title: "运单TX23829308运输紧急通知",
      time: "2018-01-09 15:32",
      info: "您的货物因天气原因暂时无法运送，请见谅。后续消息一旦变更，将会第一时间通知您,谢谢您的理解。专心服务，用心为您",
      read: false, //消息未读
    }]
  },



  //去消息详情
  toInfo: function(e) {
    wx.navigateTo({
      url: '../noticeInfo/noticeInfo'
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