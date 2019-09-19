// pages/enterprise/enterprise.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const coordtransform = require('../../utils/coordtransform.js')
const storage = require('../../utils/storage.js')
const app = getApp()
// 引入SDK核心类
const QQMapWX = require('../qqmap/qqmap-wx-jssdk.js');
const demo = new QQMapWX({
  key: app.globalData.qqMapKey // 必填 换成自己申请到的
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyInfo:{},
    news: [],
    branchs:[],
    page: 1,
    pageSize: 10,
    loadCompleted: false,
  },



  //拨打电话
  bookTel: function(e) {
    var tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  //导航
  navigation: function(e) {
    //地址解析(地址转坐标)     
    demo.geocoder({
      address: e.currentTarget.dataset.location,
      success: function(res) {
        var latitude = res.result.location.lat
        var longitude = res.result.location.lng
        var addressOn = e.currentTarget.dataset.location
        // 取到坐标并打开地图
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          address: addressOn,
          scale: 28
        })
      },
      fail: function(res) {
        // console.log(res);
        wx.showToast({
          title: res.message,
        })
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },


  //返回
  switch: function(e) {
    wx.navigateBack({ //返回
      delta: 1
    })
  },


  //新闻详情
  toInfo: function(e) {
    wx.navigateTo({
      url: '../newsInfo/newsInfo?id=' + e.currentTarget.dataset.id
    })
  },



  //网点地址
  networkMap: function (e) {

    console.log("网点地址", e.currentTarget.dataset.name);
    wx.setStorageSync('address', e.currentTarget.dataset.name)

    //地址解析(地址转坐标)     
    demo.geocoder({

      address: e.currentTarget.dataset.name,
      success: function (res) {

        var latitude = res.result.location.lat
        var longitude = res.result.location.lng
        var addressOn = wx.getStorageSync('address')

        // 取到坐标并打开地图
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          address: addressOn,
          scale: 28
        })

      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },

  getShopMessage(id) {
    wx.showLoading({
      title: '请稍等...',
    })
    const companyInfo = storage.get('companyInfo' + id)
    if(companyInfo) {
      this.setData({
        companyInfo
      })
    } else {
      ajax.getApi('mini/program/member/getShopInfo', {
        id
      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          this.setData({
            companyInfo: res.data
          })
          storage.put('companyInfo' + id, res.data, 60 * 60 * 24)
        } else {
          if (res.text) {
            wx.showToast({
              title: res.text,
              duration: 1000
            })
          }
        }
      })
    }
  },

  getBranch() {
    const page = this.data.page
    const pageSize = this.data.pageSize
    const app_area = this.data.app_area
    wx.showLoading({
      title: '查询中',
    })
    ajax.getApi('mini/program/member/findBranch', {
      page,
      pageSize,
      app_area
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const branchs = this.data.branchs
          const result = res.data
          result.forEach(v => {
            v.distance = this.getDistance(this.data.latitude, this.data.longitude, v.pointY, v.pointX)
          })
          Array.prototype.push.apply(branchs, res.data)
          this.setData({
            branchs
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
        this.getMiniShopOrderList()
      })
    } else {
      wx.showToast({
        title: '数据已全部加载完毕',
        duration: 1000
      })
    }
  },

  getNews(shop_id) {
    const news = storage.get('newsCompany' + shop_id)
    if (news) {
      this.setData({
        news
      })
    } else {
      ajax.getApi('mini/program/member/getShopNewsList', { page: 1, pageSize: 2, shop_id }, (err, res) => {
        if (res && res.success) {
          if (res.data.length > 0) {
            this.setData({
              news: res.data
            })
            storage.put('newsCompany' + shop_id, res.data, 60 * 60 * 6)
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const id = options.id
    const app_area = options.app_area
    this.setData({
      id,
      app_area
    })
    this.getLocation()
    this.getShopMessage(id)
    this.getNews(id)
    this.getBranch()
  },

  getLocation: function () {
    let latitude = this.data.latitude
    let longitude = this.data.longitude
    if (!latitude) {
      wx.getLocation({
        type: 'gcj02',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
        success: res => {
          console.log(res)
          latitude = res.latitude
          longitude = res.longitude
          this.setData({
            latitude,
            longitude,
            getlocation: true
          })
          const branchs = this.data.branchs
          if (branchs) {
            branchs.forEach(v => {
              v.distance = this.getDistance(this.data.latitude, this.data.longitude, v.pointY, v.pointX)
            })
            this.setData({
              branchs
            })
          }
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


  // 方法定义 lat,lng 
  getDistance: function(lat1, lng1, lat2, lng2){
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    console.log(lat1, lng1 + ' - ' + lat2, lng2)
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
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