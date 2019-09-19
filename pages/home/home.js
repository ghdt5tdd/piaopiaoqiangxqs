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


    banner: [],
    getBanner: false, 
    news: [],
    getNews: false, 
    interval: 5000,
    duration: 1000,

    news: [],

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
    wx.navigateTo({
      url: '../company/company',
    })
  },

  toNews(e) {
    wx.navigateTo({
      url: '../newsList/newsList',
    })
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
        if (!this.data.getBanner) {
          this.getBanner()
        }

        if (!this.data.getNews) {
          this.getNews()
        }
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

  getBanner() {
    const banner = storage.get('banner')
    if(banner) {
      this.setData({
        banner
      })
    } else {
      ajax.getApi('mini/program/member/getBanner', { banner_type : 1}, (err, res) => {
        if (res && res.success) {
          this.setData({
            getBanner:true
          })
          if (res.data.length > 0) {
            util.handleImgUrl(res.data, 'banner_img')
            this.setData({
              banner: res.data
            })
            storage.put('banner', res.data, 60 * 60 * 24)
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

  getNews() {
    const news = storage.get('news')
    if (news) {
      this.setData({
        news
      })
    } else {
      ajax.getApi('mini/program/member/getShopNewsList', { page: 1, pageSize : 5}, (err, res) => {
        if (res && res.success) {
          this.setData({
            getNews: true
          })
          if (res.data.length > 0) { 
            this.setData({
              news: res.data
            })
            storage.put('news', res.data, 60 * 60 * 6)
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


    util.callIf(() => {
      if (!this.data.getBanner) {
        this.getBanner()
      }

      if (!this.data.getNews) {
        this.getNews()
      }
    }, () => {
      return app.globalData.memberInfo !== null
    })

 
 
  },

  //跳转到新闻详情页面
  toDetail: function (e) {
    wx.navigateTo({
      url: '../newsInfo/newsInfo?id=' + e.currentTarget.dataset.id
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