// pages/punchList/punchList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:"../../images/avatar-sy.png",
    name:"昨夜星辰",
    date: '2018-12',
    hideTrip: true,
    trip: "1",
    tripCode: [{
      time: "2018-12-22 08:30:15",
    }],
    hidePunch: true,
    punch: "8",
    punchCode: [{
      time: "2018-12-22 09:25:36",
      location: "浙江乐清物流网点"
    }, {
      time: "2018-12-22 10:28:42",
      location: "浙江温州锦绣中城大厦"
    }, {
      time: "2018-12-22 13:25:42",
      location: "浙江丽水长深高速"
    }, {
      time: "2018-12-22 14:28:36",
      location: "浙江衡州杭新景高速"
    }, {
      time: "2018-12-22 15:29:57",
      location: "江西景德镇杭瑞高速"
    }, {
      time: "2018-12-22 16:26:18",
      location: "湖北黄冈福银高速"
    }, {
      time: "2018-12-22 17:28:42",
      location: "湖北鄂州沪渝高速"
    }, {
      time: "2018-12-22 18:27:33",
      location: "湖北武汉物流网点"
    }],
    hideAbsence: true,
    absence: "2",
    absenceCode: [{
      time: "2018-12-22 11:30:15",
    }, {
      time: "2018-12-22 12:30:15",
    }],

  },
  //选择年月
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  //展开关闭
  spreadTrip: function(e) {
    if (this.data.hideTrip == true) {
      this.setData({
        hideTrip: false
      })
    } else {
      this.setData({
        hideTrip: true
      })
    }
  },
  spreadPunch: function(e) {
    if (this.data.hidePunch == true) {
      this.setData({
        hidePunch: false
      })
    } else {
      this.setData({
        hidePunch: true
      })
    }
  },
  spreadAbsence: function(e) {
    if (this.data.hideAbsence == true) {
      this.setData({
        hideAbsence: false
      })
    } else {
      this.setData({
        hideAbsence: true
      })
    }
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