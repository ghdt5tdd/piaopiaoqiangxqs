// pages/pay/pay.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认选中的支付方式
    payAmount:'20.00',
    orderId: '',
    pays: [
      {
        "payName": "余额",
        "image": "../../images/zhifu1.png",
        "icon": "../../images/uncheck.png",
        "action": "balance",
        "select": 0
      },
      {
        "payName": "微信",
        "image": "../../images/zhifu3.png",
        "icon": "../../images/check.png",
        "action": "wechat",
        "select": 1
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

  pay() {
    const paySelect = this.data.paySelect
    const action = this.data.pays[paySelect].action

    if (action === 'balance') {
      this.balancePay()
    } else if (action === 'wechat') {
      this.wechatPay()
    } else {

    }
  },

  balancePay(){

  },

  wechatPay() {
    wx.showLoading({
      title: '正在发起支付请求...',
    })
    const id = this.data.orderId
    ajax.getApi('mini/program/order/shopOrderPayment', {
      id,
      app_id: app.globalData.appId,
      open_id: app.globalData.openId
    }, (err, res) => {
      if (res && res.success) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            // success
            wx.showModal({
              title: '支付结果',
              content: JSON.stringify(res),
            });
          },
          fail: function (res) {
            // fail
            console.log(res);
          },
          complete: function (res) {
            // complete
            console.log(res);
          }
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
  onLoad: function (options) {
    const amount = options.amount
    const consignee_arrive_pay_amount = options.consignee_arrive_pay_amount
    const debours_amount = options.debours_amount
    const orderId = options.id
    this.setData({
      consignee_arrive_pay_amount,
      debours_amount,
      amount,
      orderId
    })
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