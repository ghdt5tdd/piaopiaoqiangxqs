// pages/order/order.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: [{
      name: '待揽件',
      value: 0 
    }, {
      name: '待签收',
      value: 1
    }, {
      name: '全部',
      value: 2
    }],
    page: 1,
    pageSize: 10,
    count: 0,
    loadCompleted: false,
    select: 2,
    bookingOrders:[],

    order: [{
      id: 'QY20181127542',
      time: "2018-11-27 12:30",
      sendCity: "温州市",
      sendName: '黄晓克',
      reciveCity: '武汉市',
      reciveName: '李思',
      forwarder: "浙江乐清物流公司",
      cargoName: '图书印刷品',
      cargoNum: '2',
      sta: 's1',
      status: '待揽件',
      statusPic: '../../images/order1.png'
    }, {
      id: 'QY20181112116',
      time: "2018-11-12 15:46",
      sendCity: "武汉市",
      sendName: '李思',
      reciveCity: '温州市',
      reciveName: '黄晓克',
      forwarder: "武汉乐清物流公司",
      cargoName: '电子',
      cargoNum: '1',
      sta: 's2',
      status: '已取消',
      statusPic: '../../images/order2.png'
    }, {
      id: 'QY20181127542',
      time: "2018-11-08 12:30",
      sendCity: "温州市",
      sendName: '黄晓克',
      reciveCity: '武汉市',
      reciveName: '李思',
      forwarder: "浙江乐清物流公司",
      cargoName: '图书印刷品',
      cargoNum: '2',
      sta: 's1',
      status: '待揽件',
      statusPic: '../../images/order1.png'
    }, {
      id: 'QY20181112116',
      time: "2018-11-08 11:46",
      sendCity: "温州市",
      sendName: '黄晓克',
      reciveCity: '武汉市',
      reciveName: '李思',
      forwarder: "浙江乐清物流公司",
      cargoName: '纸制品',
      cargoNum: '1',
      sta: 's2',
      status: '已取消',
      statusPic: '../../images/order2.png'
    }, ]

  },

  //选择订单状态
  select: function(e) {
    var index = e.currentTarget.dataset.index
    var index = e.currentTarget.dataset.index
    this.setData({
      select: index,
    })
  },

  //跳转到订单详情
  toInfo: function(e) {
    wx.navigateTo({
      url: '../orderinfo/orderinfo?id=' + e.currentTarget.dataset.id 
    })
  },

  //选择状态
  selectStatus: function (e) {
    var index = parseInt(e.target.dataset.value);
    this.setData({
      select: index,
      page: 1,
      bookingOrders: [],
      loadCompleted: false
    }, () => {
      this.getListBookingOrder()
    })
  },

  getListBookingOrder() {
    const page = this.data.page
    const pageSize = this.data.pageSize
    const status = this.data.select
    wx.showLoading({
      title: '查询中',
    })
    ajax.getApi('mini/program/order/listBookingOrder', {
      page,
      pageSize,
      status
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const bookingOrders = this.data.bookingOrders
          Array.prototype.push.apply(bookingOrders, res.data)
          this.setData({
            bookingOrders
          })
        } else {
          this.setData({
            loadCompleted: true
          })
          wx.showToast({
            title: '数据已全部加载完毕',
            duration: 1000
          })
        }

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

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    if (!loadCompleted) {
      wx.showLoading({
        title: '更多数据加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.getListBookingOrder(() => {
          wx.hideLoading()
        })
      })
    } else {
      wx.showToast({
        title: '数据已全部加载完毕',
        duration: 1000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getListBookingOrder()
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