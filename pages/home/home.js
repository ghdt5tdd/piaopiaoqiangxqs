// pages/home/home.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    newsnum: "2",
    hasUserInfo: false, //未登录
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    first: true, //第一次登录


    banner: [ {
      pic: "",
    }],
    interval: 5000,
    duration: 1000,

    news: [
    //   {
    //   logo: "",
    //   from: "德力西物流",
    //   time: "2019-07-08",
    //   info: [{
    //     pic: "",
    //     name: "冷链为何上了政治局会议？城乡冷链物流建设将迎大发展",
    //     spec: "立秋之后，辽宁盘锦的河蟹又将迎来销售旺季。曾在辽宁沈阳工作的小张，每逢中秋都要去一趟盘锦市，为家人买一些盘锦出产的河蟹，让家人尝尝鲜。每次买完，都用顺丰寄回老家山东，一般两天就能寄到。收到的时候，螃蟹还是活蹦乱跳的，家人煮了之后发照片给小张，小张觉得很幸福。远在辽宁的螃蟹，通过快递到了山东依然活蹦乱跳，冷链物流功不可没",
    //   }],

    // }
    ],

  },

  showscan(e){
    wx.scanCode({
      success: (res) => {
        const url = encodeURIComponent(res.result)
        console.log(res.result)
        wx.navigateTo({
          url: '../first/first?q=' + url,
        })
      }
    })
  },

  toCarrier(e) {
    wx.showToast({
      title: '此模块暂不开放',
    })
    // wx.navigateTo({
    //   url: '../receiver/receiver?type=' + type,
    // })
  },

  toShopOrder(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../receiver/receiver?type=' + type,
    })
  },

  //登录
  getUserInfo: function (e) {
    const userInfo = e.detail.userInfo
    if (userInfo == undefined) {
      wx.showToast({
        title: '请先登录账号',
        icon: 'none',
        duration: 3000,
        mask: true
      })
    } else {
      app.globalData.userInfo = userInfo
      app.bindMember(userInfo, () => {

      })

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })

    }
  },

  loadUserInfo() {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadUserInfo()
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
    util.callIf(() => {
      if (!app.globalData.isBindPhone) {
        wx.navigateTo({
          url: '../bind/bind'
        })
        return;
      }
    }, () => {
      return app.globalData.memberInfo !== null
    })
 
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