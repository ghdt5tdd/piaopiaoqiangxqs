// pages/couponList/couponList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
        name: '全部',
      },
      {
        name: '待使用',
      },
      {
        name: '已使用',
      },
      {
        name: '已过期',
      },
    ],
    selectStatus: 0,

    selectCoupon: [{
      tag: 0,
      reduce: "5",
      over: "无门槛",
      timestart: "2018.08.12",
      endstart: "2018.09.30",
      couponSelect: '1'
    }, {
      tag: 1,
      reduce: "10",
      over: "99",
      timestart: "2018.08.12",
      endstart: "2018.09.30",
      couponSelect: '2'
    }, {
      tag: 1,
      reduce: "15",
      over: "168",
      timestart: "2018.08.12",
      endstart: "2018.09.30",
      couponSelect: '1'
    }, {
      tag: 1,
      reduce: "20",
      over: "298",
      timestart: "2018.08.12",
      endstart: "2018.09.30",
      couponSelect: '3'
    }, {
      tag: 1,
      reduce: "50",
      over: "528",
      timestart: "2018.08.12",
      endstart: "2018.09.30",
      couponSelect: '1'
    }],




  },

  //选择状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
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