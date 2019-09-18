// pages/forwarder/forwarder.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
const QQMapWX = require('../qqmap/qqmap-wx-jssdk.js');
const demo = new QQMapWX({
  key: app.globalData.qqMapKey // 必填 换成自己申请到的
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    loadCompleted: false,
    getInfoAble: false,
    forwarderList: []
  },

  bindQuery(e) {
    this.setData({
      query: e.detail.value
    })
  },

  //选中承运商
  toSend: function (e) {
    var index = e.currentTarget.dataset.index
    if (this.data.getInfoAble) {
      wx.navigateBack({ //返回
        delta: 1
      })

      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        company: this.data.forwarderList[index]
      })
    }
  },

  //拨打电话
  call: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },

  //导航
  navigation: function (e) {
    const address = e.currentTarget.dataset.location
    if (!address) {
      wx.showToast({
        title: '无坐标信息',
      })
      return;
    }
    //地址解析(地址转坐标)     
    demo.geocoder({
      address,

      success: function (res) {
        console.log(res)
        var latitude = res.result.location.lat
        var longitude = res.result.location.lng
        // 取到坐标并打开地图
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          address,
          scale: 28
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  search(e) {
    this.setData({
      page: 1,
      forwarderList: [],
      loadCompleted: false
    }, () => {
      this.getBookingOrderCarrier()
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
        this.getBookingOrderCarrier(() => {
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

  getBookingOrderCarrier() {
    wx.showLoading({
      title: '获取中...',
    })
    const query = this.data.query
    const page = this.data.page
    const pageSize = this.data.pageSize
    const params = {
      page,
      pageSize,
    }
    if (query) {
      params.name = query
    }
    ajax.getApi('mini/program/member/getShopList', params, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const forwarderList = this.data.forwarderList
          util.handleImgUrl(res.data, 'logo_img')
          Array.prototype.push.apply(forwarderList, res.data)
          this.setData({
            forwarderList
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const getInfoAble = options.getInfoAble
    if (getInfoAble) {
      this.setData({
        getInfoAble: true
      })
    }
    // if (options.check != 0) { //是否是从预约下单页面过来的
    //   this.setData({
    //     checkList: false
    //   })
    // } else {

    // var forwarderList = this.data.forwarderList
    // var index = wx.getStorageSync('checkList')

    // if (options.checkName != '请选择承运商') { //是否选择过承运商
    //   forwarderList[index].check = "../../images/check.png"
    // }

    //   this.setData({
    //     checkList: true,
    //   })
    // }
    this.getBookingOrderCarrier()
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