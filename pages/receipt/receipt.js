// pages/receipt/receipt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //签收回单
    receiptName: "张三",
    receiptTel: "13525362231",
    receiptTime: "2018-01-16 16:27",
    receiptPic: "../../images/picture2.png",
  },


//回单上传

  changeReceipt: function (e) {
    var _this = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图
      sourceType: ['album', 'camera'],  // 指定来源是相册还是相机
      success: function (res) {
        var tempFilePaths = res.tempFilePaths; //可以作为img标签的src属性显示图片
        _this.setData({
          receiptPic: tempFilePaths
        });
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})