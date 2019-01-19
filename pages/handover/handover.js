// pages/sign/sign.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopOrderId: undefined,
    selectOrder:{},
    latitude: undefined,
    longitude: undefined,
    hide: true,
    hideCoupon: true,
    couponAmount: "10", //带红包的运单，不带就没有couponAmount、couponLimit的数据
    couponLimit: "30",
    hideTip: true,
  },

  handover: function () {
    const id = this.data.shopOrderId
    const latitude = this.data.latitude
    const longitude = this.data.longitude

    if (this.data.getlocation) {
      wx.showLoading({
        title: '正在转接中...',
      })
      ajax.postApi('mini/program/order/scanReceiptAndTransferShopOrder', {
        id,
        x: longitude,
        y: latitude,
        type:0
      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          wx.showToast({
            title: '转接成功',
            success: function() {
              wx.reLaunch({
                url: '../home/home',
              })
            }
          })
        } else {
          wx.showToast({
            title: res.text,
            duration: 1000
          })
        }
      })

    } else {
      wx.showToast({ 
        title: '坐标获取异常',
      })
    }
  },
  


  //签收
  toSelect: function(e) {
    if (this.data.couponAmount == undefined) {
      this.setData({
        hide: false,
        hideTip: false,
        id: "18352790283072",
      })
    } else {
      this.setData({
        hide: false,
        hideCoupon: false,
      })
    }

  },


  //领取红包打开回单提示
  hideCoupon: function(e) {
    this.setData({
      hideCoupon: true,
      hide: false,
      hideTip: false,
      id: "18352790283072",
    })
  },


  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hideCoupon: true,
      hideTip: true,
    })
  },

  getLocation: function () {
    let latitude = this.data.latitude
    let longitude = this.data.longitude
    if (!latitude) {
      wx.getLocation({
        type: 'wgs84',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
        success: res => {
          console.log(res)
          latitude = res.latitude
          longitude = res.longitude
          this.setData({
            latitude,
            longitude,
            getlocation: true
          })
        },
        fail: res => {
          this.setData({
            getlocation: false
          })
          wx.showModal({
            title: '坐标异常',
            content: '获取用户当前坐标失败,无法进行签收',
          })
        }
      })
    }
  },

  getShopOrderDetail(shopOrderId) {
    wx.showLoading({
      title: '运单加载中...',
    })
    ajax.getApi('mini/program/order/getShopOrderDetail', {
      shopOrderId
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        const selectOrder = res.data
        this.setData({
          selectOrder,
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
    this.getLocation()
    const shopOrderId = options.id
    this.setData({
      shopOrderId
    })
    this.getShopOrderDetail(shopOrderId)
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

  },

})