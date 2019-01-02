// pages/bindcard/bindcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realPicface: "../../images/picface.jpg",
    realPicback: "../../images/picback.jpg",
    realDrive1: "../../images/drive1.jpg",
    realDrive2: "../../images/drive2.jpg",
  },

  //上传身份证、驾驶证
  changePicface: function (e) {
    var _this = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图
      sourceType: ['album', 'camera'],  // 指定来源是相册还是相机
      success: function (res) {
        var tempFilePaths = res.tempFilePaths; //可以作为img标签的src属性显示图片
        _this.setData({
          realPicface: tempFilePaths
        });
      }
    })
  },

  changePicback: function (e) {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          realPicback: tempFilePaths
        });
      }
    })
  },


  changeDrive1: function (e) {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          realDrive1: tempFilePaths
        });
      }
    })
  },


  changeDrive2: function (e) {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          realDrive2: tempFilePaths
        });
      }
    })
  },




  //确认绑定
  toFirst: function(e) {
    wx.navigateBack({ //返回
      delta: 2
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 3]; //上上个页面
    //直接调用上一个页面的setData()方法，把数据存到上上个页面中去

    prevPage.setData({
      first: false,
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