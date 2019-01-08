// pages/first/first.js
const app = getApp()
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false, //未登录
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shopOrderId:'',
    shopOrderDetail: undefined,
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
    //如果用户信息没有初始化完毕，拒绝访问
    if (!app.globalData.memberInfo){
      return;
    }
    // if (!app.globalData.isBindPhone) {
    //   wx.navigateTo({
    //     url: '../bind/bind'
    //   }) 
    // }

    if (this.data.shopOrderDetail.settlement_mode === 'receiver_pay') {
      wx.navigateTo({
        url: '../pay/pay?amount=' + this.data.shopOrderDetail.insured_amount
      })
    } else {
      wx.navigateTo({
        url: '../sign/sign'
      }) 
    }
  },

  loadUserInfo () {
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

  getShopOrderDetail(shopOrderId){
    wx.showLoading({
      title: '运单加载中...',
    })
    ajax.getApi('mini/program/order/getShopOrderDetail', {
      shopOrderId
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        console.log(res)
        this.setData({
          shopOrderDetail: res.data
        })
      } else {
        if (res.text) {
          wx.showToast({
            title: res.text,
            duration: 1000
          })
        }
      }
    })	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.q)
    // const q = options.q
    // if(!q) {
    //   wx.showToast({
    //     title: '非法错误',
    //   })
    //   return ;
    // }
    // const scanUrl = decodeURIComponent(options.q)
    
    //测试
    const shopOrderId = 'b5e4ae0b20be449288b8e3e4f0a5394d'
    this.setData({
      shopOrderId
    })
    util.callIf(() => {
      this.getShopOrderDetail(shopOrderId)
    }, () => {
      return app.globalData.memberInfo !== null
    })
    
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