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
    ac:'',
    acText:'一键签收',
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
    sign: "toEnvelope",
    signedState:"415,420,425,430,435,440,490,500"
  },


  //登录
  getUserInfo: function(e) {
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
        this.getShopOrderDetail(this.data.shopOrderId)
      })

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })

    }
  },

  toDetail() {
    //如果用户信息没有初始化完毕，拒绝访问
    if (!app.globalData.memberInfo) {
      return;
    }

    if (!app.globalData.memberInfo.phone) {
      wx.navigateTo({ //第一次登录需要绑定手机号，以后直接登录
        url: '../bind/bind'
      })
      return;
    }
    
    wx.navigateTo({ //第一次登录需要绑定手机号，以后直接登录
      url: '../transportdetail/transportdetail?id=' + this.data.shopOrderId
    })
  },

  //签收
  toSign: function(e) {
    //如果用户信息没有初始化完毕，拒绝访问
    if (!app.globalData.memberInfo){
      return;
    }

    if (!app.globalData.memberInfo.phone) {
      wx.navigateTo({ //第一次登录需要绑定手机号，以后直接登录
        url: '../bind/bind'
      })
      return;
    }

    const ac = this.data.ac
    if (ac === 'jj') {
      //判断当前用户是否已经通过司机身份审核，通过才能进行交接
      // if (!app.globalData.memberInfo.司机身份){
      //   wx.navigateTo({
      //     url: '../bindcard/bindcard'
      //   })
      // }
      //前往交接页面
      wx.navigateTo({
        url: '../handover/handover?id=' + this.data.shopOrderId
      }) 
      return;
    } else if(ac === 'qs'){
      //判断运单是否为接收人到付，到付则先须先进行付款，不为到付则直接进入签收页面
      if (this.data.shopOrderDetail.settlement_mode === 'receiver_pay') {
        //这里还需要判断运单的支付状态，已支付的话也是直接跳转到签收
        // if (this.data.shopOrderDetail.已支付){
        //   wx.navigateTo({
        //     url: '../sign/sign?id=' + this.data.shopOrderId
        //   })
        //   return;
        // }else {
          wx.navigateTo({
            url: '../pay/pay?amount=' + this.data.shopOrderDetail.insured_amount + '&id=' + this.data.shopOrderDetail.id
          })
          return;
        // }
      } else {
        wx.navigateTo({
          url: '../sign/sign?id=' + this.data.shopOrderId
        })
        return;
      }
    } else {
      wx.showLoading({
        title: '错误',
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
        let ac = this.data.ac
        let acText = this.data.acText
        //判断当前用户手机号与收件人手机号是否一致，一致则强制判断该用户动作为签收
        const phone = app.globalData.memberInfo.phone
        const consignee_tel = res.data.consignee_tel
        if (phone && consignee_tel && consignee_tel.indexOf(phone) !== -1) {
          ac = 'qs'
          acText = this.getAcText(ac)
        }
        this.setData({
          shopOrderDetail: res.data,
          ac,
          acText
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
    const q = options.q
    if(!q) {
      wx.showToast({
        title: '非法错误',
      })
      return ;
    }
    this.loadUserInfo()
    const scanUrl = decodeURIComponent(options.q)
    const shopOrderId = util.getQueryString(scanUrl, 'id')
    const ac = util.getQueryString(scanUrl, 'ac') || 'jj'

    //测试
    // const shopOrderId = 'c8595a673d50492c9cbef928314b587a' 
    // const ac = 'jj' 

    let acText = this.getAcText(ac)

    if (acText === 'error') {
      return;
    }

    this.setData({
      shopOrderId,
      ac,
      acText
    })

    util.callIf(() => {
      this.getShopOrderDetail(shopOrderId)
    }, () => {
      return app.globalData.memberInfo !== null
    })

  },

  getAcText(ac) {
    switch (ac) {
      case 'qs':
        return '一键签收'
      case 'jj':
        return '一键交接'
      default:
        return 'error'
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