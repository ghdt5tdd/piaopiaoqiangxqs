// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认选中的支付方式
    payAmount:'20.00',
    pays: [
      {
        "payName": "余额",
        "image": "../../images/zhifu1.png",
        "icon": "../../images/uncheck.png",
        "select": 0
      },
      {
        "payName": "支付宝",
        "image": "../../images/zhifu2.jpg",
        "icon": "../../images/check.png",
        "select": 1
      },
      {
        "payName": "微信",
        "image": "../../images/zhifu3.png",
        "icon": "../../images/uncheck.png",
        "select": 2
      },
    ],
    paySelect: 1,
  },


  //选择支付方式
  choosePay: function (e) {
    var index = e.currentTarget.dataset.select
    var pays = this.data.pays
    for (var i = 0; i < pays.length; i++) {
      pays[i].icon = "../../images/uncheck.png"
    }
    pays[index].icon = "../../images/check.png"

    this.setData({
      paySelect: index,
      pays:pays
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