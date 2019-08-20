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
    banner: [{
      pic: "",
    }],
    interval: 5000,
    duration: 1000, 
    logistics: [{
      'status': '在途中',
      'detail': [{
        'loginfo': '预计到达时间：剩余5小时',
        'logdate': '2018-08-21',
        'logtime': '18:37',
      }, {
        'loginfo': '由[浙江乐清]发往[浙江杭州]',
        'logdate': '2018-08-18',
        'logtime': '06:05',
      }, {
        'loginfo': '货物已由[浙江乐清物流公司]装车',
        'logdate': '2018-08-18',
        'logtime': '01:32',
      }],
    }, {
      'status': '已发货',
      'detail': [{
        'loginfo': '您的货物已出库',
        'logdate': '2018-08-17',
        'logtime': '20:26',
      },],
    },],

    shopOrderId:'',
    forwarder: "浙江华安物流",
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
    shareData: {
      orderId: "无",
      send: "无",
      sendAdd: "无",
      receive: "无",
      receiveAdd: "无",
      sendTime: "无",
    },
    shareResultImgPath: '',
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

    const shopOrderDetail = this.data.shopOrderDetail
    const shopOrderId = this.data.shopOrderId
    const phone = app.globalData.memberInfo.phone

    //发货人
    if (shopOrderDetail.consigner_tel.indexOf(phone) !== -1) {
      wx.navigateTo({
        url: '../transportdetail/transportdetail?id=' + shopOrderId
      })
      return;
    }

    //收货人
    if (shopOrderDetail.consignee_tel.indexOf(phone) !== -1) {
      wx.navigateTo({ 
        url: '../transportdetail/transportdetail?id=' + shopOrderId
      })
      return;
    }

    //司机
    ajax.getApi('mini/program/order/shopOrderDriverValidate', {
      shopOrderId
    }, (err, res) => {
      if (res && res.success) {
        wx.navigateTo({ 
          url: '../transportdetail/transportdetail?id=' + shopOrderId
        })
        return;
      } else {
        if (res.text) {
          wx.showToast({
            title: res.text || '您没有权限',
            duration: 1000
          })
        }
        return;
      } 

      return;
    })	
  },

  toNode(e) {
    const transnport_truck_flight_number = this.data.shopOrderDetail.transnport_truck_flight_number
    wx.navigateTo({ //第一次登录需要绑定手机号，以后直接登录
      url: '../point/point?id=' + this.data.shopOrderId + '&truckNumber=' + transnport_truck_flight_number
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
        const consignee_arrive_pay_amount = this.data.shopOrderDetail.consignee_arrive_pay_amount
        const debours_amount = this.data.shopOrderDetail.debours_amount
        const amount = this.data.shopOrderDetail.amount
        //这里还需要判断运单的支付状态，已支付的话也是直接跳转到签收
        if (this.data.shopOrderDetail.is_pay == 1){
          wx.navigateTo({
            url: '../sign/sign?id=' + this.data.shopOrderId
          })
          return;
        } else {
          const amount = this.data.shopOrderDetail.amount || 0
          const consignee_arrive_pay_amount = this.data.shopOrderDetail.consignee_arrive_pay_amount || 0
          const debours_amount = this.data.shopOrderDetail.debours_amount || 0
          wx.navigateTo({
            url: '../pay/pay?amount=' + amount
              + '&consignee_arrive_pay_amount=' + consignee_arrive_pay_amount
              + '&debours_amount=' + debours_amount
              + '&id=' + this.data.shopOrderDetail.id
          })
          return;
        }
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

  //查看实时定位
  toLoaction: function (e) {
    wx.navigateTo({
      url: '../location/location?shop_order_id=' + this.data.shopOrderId
    })
  },

  //查看实时定位
  toTruck: function (e) {
    const shopOrderId = this.data.shopOrderId
    const truckNumber = this.data.shopOrderDetail.transnport_truck_flight_number
    if (truckNumber) {
      wx.navigateTo({
        url: '../truck/truck?truckNumber=' + truckNumber
      })
    } else {
      wx.showModal({
        title: '无车牌号',
        content: '此运单暂无车牌号绑定，是否手动查询?',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../truck/truck'
            })
          }
        }
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
        const shoporderDetail = res.data
        const shareData = {
          orderId: shoporderDetail.bill_no,
          send: shoporderDetail.consigner_unit,
          sendTel: shoporderDetail.consigner_tel,
          sendAdd: shoporderDetail.consigner_address,
          receive: shoporderDetail.consignee_unit,
          receiveTel: shoporderDetail.consignee_tel,
          receiveAdd: shoporderDetail.consignee_address,
          sendTime: shoporderDetail.bill_date
        }
        this.setData({
          shopOrderDetail: res.data,
          ac,
          acText,
          shareData
        }, () => {
          const shareDataCompoent = this.selectComponent("#shareData")
          shareDataCompoent.draw(res => {
            this.setData({
              shareResultImgPath: res.tempFilePath
            })
          })
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

  getNodeDataByShopOrder(shopOrderId){
    ajax.getApi('mini/program/order/getNodeDataByShopOrder', {
      shopOrderId
    }, (err, res) => {
      if (res && res.success) {
        if (res.data.length > 0) {
          const orderNodes = res.data
          orderNodes.forEach(v => {
            if (v.create_date) {
              v.createDate = v.create_date.substring(0, 10)
              v.createTime = v.create_date.substring(11)
            }
          })
          this.setData({
            orderNodes
          })
        } else {
          wx.showToast({
            title: '暂无节点',
          })
        }
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.loadUserInfo()
    const q = options.q
    if(!q) {
      wx.showToast({
        title: '非正确二维码',
      })
      return ;
    }
    const scanUrl = decodeURIComponent(options.q)
    const shopOrderId = util.getQueryString(scanUrl, 'id')
    const ac = util.getQueryString(scanUrl, 'ac') || 'jj'

    if (!shopOrderId) {
      wx.showToast({
        title: '非正确二维码',
      })
      return;
    }

    //--------------测试----------------------
    // const shopOrderId = '0000027797a14f9b9b499f653c5cc922' 
    // const ac = 'qs' 
    //--------------测试----------------------

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
      this.getNodeDataByShopOrder(shopOrderId)
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
    let url = "https://fall.wlhn.com/ppq?id=" + this.data.shopOrderDetail.id
    url = encodeURIComponent(url) 
    return {
      title: this.data.shopOrderDetail.area_name,
      path: '/pages/first/first?q=' + url,
      imageUrl: this.data.shareResultImgPath
    }
  }
})