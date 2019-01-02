// pages/first/first.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false, //未登录
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    id: "18352790283072",
    time: "2018-01-10",
    start: "浙江温州",
    end: "湖北武汉",
    receive: "武汉恒望科技有限公司",
    num: "210",
    payStyle: "到付1",
    payAmount: "20.00",
    first: true,
    sign: "toEnvelope"
  },


  //登录
  getUserInfo: function(e) {
    const userInfo = e.detail.userInfo
    if (userInfo == undefined) {
      wx.showToast({
        title: '扫描请先登录账号',
        icon: 'none',
        duration: 3000,
        mask: true
      })
    } else {
      app.globalData.userInfo = userInfo
      app.bindMember(userInfo, res => {
        if(!res.data.phone) {
          wx.navigateTo({ //第一次登录需要绑定手机号，以后直接登录
            url: '../bind/bind'
          })
        }
      })

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })

    }
  },


  //签收
  toSign: function(e) {
    console.log(app.globalData.memberInfo)
    if (this.data.payStyle == '到付') {
      wx.navigateTo({
        url: '../pay/pay'
      })
    } else {
      wx.navigateTo({
        url: '../sign/sign'
      }) 
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

    }
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