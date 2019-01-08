// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    name: "可用余额",
    account: "12",
    opt: "去充值",
    toW: "toRecharge",

    orderStatus: [{
        name: '全部',
      },
      {
        name: '收入',
      },
      {
        name: '支出',
      },
    ],
    firstStatus: 0,
    record: [{
      name: "购买商品",
      account: "12",
      time: "2018-08-16",
      spec: "-88",
    }, {
      name: "充值",
      account: "100",
      time: "2018-08-15",
      spec: "+100",
    }]

  },


  //选择状态
  selectStatus: function(e) {
    var index = parseInt(e.target.dataset.index);
    this.setData({
      firstStatus: index
    })
  },


  toRecharge: function(e) {
    wx.navigateTo({
      url: '../recharge/recharge',
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