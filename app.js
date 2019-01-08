//app.js
const ajax = require('utils/ajax.js')
const util = require('utils/util.js')
const md5 = require('utils/md5.js');  
App({
  onLaunch: function (e) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const openId = wx.getStorageSync('openId') || ''
    const unionId = wx.getStorageSync('unionId') || ''
    const sessionKey = wx.getStorageSync('sessionKey') || ''

    if(openId === '') {
      // 登录
      const app_area = this.globalData.platformAppArea
      const secret = this.globalData.appSecret
      wx.login({
        success: res => {
          ajax.getApi('mini/program/code2Session', {
            app_area: app_area,
            js_code: res.code,
            app_id: this.globalData.appId
          }, (err, rest) => { 
            if (rest && rest.success) {
              const result = rest.data
              this.globalData.openId = result.openid
              this.globalData.unionId = result.unionid
              this.globalData.sessionKey = result.session_key
              wx.setStorageSync('openId', result.openid)
              wx.setStorageSync('unionId', result.unionid)
              wx.setStorageSync('sessionKey', result.session_key)
              this.getUserSetting()
            }
          })
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    } else {
      this.globalData.openId = openId
      this.globalData.unionId = unionId
      this.globalData.sessionKey = sessionKey
    }

    this.getUserSetting()
  },

  getUserSetting() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            lang: 'zh_CN',
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.bindMember(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  bindMember(userInfo, callback) {
    ajax.getApi('mini/program/createMember', {
      ...userInfo,
      openId: this.globalData.openId,
      unionId: this.globalData.unionId,
      app_area: this.globalData.platformAppArea,
      // referrer_member_id: this.globalData.piaopiaoQianMemberId
    }, (err, res) => {
      if (res.success) {
        this.getMemberInfo(callback)
      } else {
        wx.showToast({
          title: '创建用户失败',
          mask: true
        })
      }
    })
  },
  getMemberInfo(callback) {
    const signature = md5.hexMD5(this.globalData.openId + this.globalData.appId)
    ajax.postApi('mini/program/member/miniLogin', {
      signature,
      openId: this.globalData.openId
    }, (err, res) => {
      if (res.success) {
        if(callback){
          callback(res.data)
        }
        this.globalData.memberInfo = res.data
        if(res.data.phone) {
          this.globalData.isBindPhone = true
        }
        console.log(this.globalData)
      }
    })
  },

  globalData: {
    platformAppArea: 'wlhn',
    piaopiaoQianAppArea: 'def2dbc9fddf415e8b96dc167ccea5dc',
    piaopiaoQianMemberId: 'ba154b8a17d94b298e3fb6feb3593a39',
    qqMapKey: 'ZJIBZ-2DZLR-BTNWK-WNUAG-JCMJ6-C4BHJ',
    appId: 'wxd1789c4a058f433d',
    openId: '',
    sessionKey: '',
    unionId: '',
    memberInfo: null,
    isBindPhone: false,
    userInfo: null,
    jsSessionId: null,
  }
})