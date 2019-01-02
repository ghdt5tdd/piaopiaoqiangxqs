// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    paynum: [
      {
        "num": "50",
        "icon": "../../images/gou.png",
        "select": 0
      },
      {
        "num": "100",
        "icon": "",
        "select": 1
      },
      {
        "num": "200",
        "icon": "",
        "select": 2
      },
      {
        "num": "500",
        "icon": "",
        "select": 3
      },
      {
        "num": "1000",
        "icon": "",
        "select": 4
      }
    ],
    numSelect: 0,
    //默认选中的充值方式
    pays: [
      {
        "payName": "支付宝",
        "image": "../../images/zhifu2.jpg",
        "icon": "../../images/check.png",
        "select": 0
      },
      {
        "payName": "微信",
        "image": "../../images/zhifu3.png",
        "icon": "../../images/uncheck.png",
        "select": 1
      }
    ],
    paySelect: 0,
  },


  //选择支付金额
  chooseNum: function (data) {
    var Index = data.currentTarget.dataset.select
    for (var i = 0; i < this.data.paynum.length; i++) {

      var I = "paynum[" + i + "].icon"
      if (i == Index) {
        this.setData({
          [I]: "../../images/gou.png",
          numSelect: Index,
        })
      }
      else {
        this.setData({
          [I]: "",
          numSelect: Index,
        })
      }
    }
  },


  //选择支付方式
  choosePay: function (data) {
    var Index = data.currentTarget.dataset.select

    for (var i = 0; i < this.data.pays.length; i++) {

      var I = "pays[" + i + "].icon"
      if (i == Index) {
        this.setData({
          [I]: "../../images/check.png",
          paySelect: Index,
        })
      }
      else {
        this.setData({
          [I]: "../../images/uncheck.png",
          paySelect: Index,
        })
      }
    }
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