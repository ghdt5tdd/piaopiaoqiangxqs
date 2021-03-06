// pages/my/my.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    punchTip:"还有5分钟将记一次缺席",
    phone: ''
  },

  //拨打电话
  bookTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },

  //消息通知
  toNotice: function(e) {
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  
  toShopOrder(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../receiver/receiver?type=' + type,
    })
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
        app.bindmember(() => {
          this.setData({
            phone: app.globalData.memberInfo.phone
          })
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

  getUnreadMessageCount() {
    ajax.getApi('mini/program/member/getMessageTypeByRole', {

    }, (err, res) => {
      if (res && res.success) {
        const messageList = res.data
        let unReadNum = 0
        messageList.forEach(v => {
          unReadNum += v.unread_message_count
        })
        if (unReadNum > 0) {
          this.setData({
            newsnum: unReadNum
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.memberInfo){
      this.setData({
        phone: app.globalData.memberInfo.phone
      })
    }
    this.loadUserInfo()
    // this.getUnreadMessageCount()
    wx.canvasToTempFilePath({
      canvasId: 'content',
      quality: 1,
      success(res) {
        console.log()
        this.setData({
          shareImg: res.tempFilePath
        })
        
      }
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
    console.log(this.data.shareImg)
    return {
      title: 'test',
      path: '/pages/my/my?q=1',
      imageUrl: this.data.shareImg
    }
  }
})