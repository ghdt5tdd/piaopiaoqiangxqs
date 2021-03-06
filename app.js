//app.js
const ajax = require('utils/ajax.js')
const util = require('utils/util.js')
const md5 = require('utils/md5.js')
App({
  onLaunch: function (e) {
    this.checkUpdate()
    this.setGlobalShareSetting()
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
      this.getUserSetting()
    }

  },

  checkUpdate() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            wx.clearStorage()
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
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
    if (this.globalData.memberInfo) {
      return;
    }
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
        // console.log(this.globalData)
      }
    })
  },

  pay(amount, callback) {
    wx.showLoading({
      title: '发起支付请求...',
    })

    const _this = this
    const app_id = this.globalData.appId
    const open_id = this.globalData.openId
    ajax.getApi('mini/program/member/recharge', {
      app_id,
      open_id,
      amount
    }, (err, res) => {
      if (res && res.success) {
        const data = res.data.payParameters
        const outTradeNo = res.data.outTradeNo
        wx.hideLoading()
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success: function (res) {
            if (callback) {
              callback(res)
            }
            _this.sendPayTemplateMessage(amount, data.prepay_id, outTradeNo)
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

  sendPayTemplateMessage(amount, prepay_id, outTradeNo) {
    ajax.postApi('mini/program/template/send', {
      app_area: this.globalData.platformAppArea,
      open_id: this.globalData.openId,
      app_id: this.globalData.appId,
      form_id: prepay_id,
      template_id: 'DTGvbIKR3jTMKI1YdlyqREpIUYlsm6pF6aNNACV63Rk',
      template_data: JSON.stringify({
        keyword1: {
          value: this.globalData.memberInfo.user_nickname
        },
        keyword2: {
          value: amount + ''
        },
        keyword3: {
          value: util.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
        },
        keyword4: {
          value: outTradeNo
        },
        keyword5: {
          value: '如有问题请咨询客服'
        },
      }),
    }, (err, res) => {
      if (res && res.success) {

      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	
  },

  setGlobalShareSetting() {
    wx.onAppRoute(res => {
      //获取加载的页面
      const pages = getCurrentPages()
      //获取当前页面的对象
      const view = pages[pages.length - 1]
      if (view) {
        const route = view.route
        //onShareAppMessage()返回undefined说明此页面没有做特定分享操作，则统一使用默认分享
        if (!view.onShareAppMessage || view.onShareAppMessage() === undefined) {
          view.onShareAppMessage = function () {
            return {
              "title": "票票签",
              "imageUrl": "http://sping-cloud-fall.oss-cn-shanghai.aliyuncs.com/wlhn/wxmini/resource/ppq.png",
              "path": "pages/home/home"
            }
          } 
        }
      }
    })
  },

  globalData: {
    platformAppArea: 'wlhnGxqs',
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