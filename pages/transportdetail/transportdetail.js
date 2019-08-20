//pages/transportdetail/transportdetail.js
const ajax = require('../../utils/ajax.js')
const barcode = require('../../utils/weapp-barcode.js')
const starMap = new Map()
starMap.set(1, '非常差')
starMap.set(2, '较差')
starMap.set(3, '一般')
starMap.set(4, '较好')
starMap.set(5, '非常好')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "运单详情",
    }, {
      name: "异常上报",
    }, {
      name: "签收回单",
    }, {
      name: "订单评价",
    }, {
      name: "电子回单",
    }, ],

    selectStatus: 0,
    ul: "ul-5",

    shopOrderId:'',
    shoporderDetail:{},
    shoporderEvaluation:undefined,
    returnReceipt:{
      receipt_name: ''
    },

    //运单详情
    transportId: "18352790283072",
    transportTime: "2018-01-10",
    transportStart: "浙江温州",
    transportEnd: "湖北武汉",
    startTime: "2018-01-11",
    endTime: "2018-01-15",
 
    startCompany: "温州物流",
    startName: "郭丽",
    startTel: "13633928364",
    startDoor: "浙江省乐清市柳市镇德力西高科技工业园区",
    endCompany: "武汉恒望科技有限公司",
    endName: "张三",
    endTel: "15890268364",
    endDoor: "湖北省武汉市洪山区光谷世贸中心",
 

    transportBar: [{
      bar: [{
        label: "开始起运时间",
        text: "2018-01-11 16：50",
      }, {
        label: "预计送达时间",
        text: "2018-01-15 10：00",
      }, {
        label: "货物名称",
        text: "普货",
      }, {
        label: "货物件数",
        text: "180",
      }, {
        label: "货物重量",
        text: "2637kg",
      }, {
        label: "货物体积",
        text: "4.8m³",
      }, {
        label: "备注",
        text: "",
      }, ]
    }, {
      bar: [{
        label: "承运商",
        text: "浙江乐清物流",
      }, {
        label: "联系人",
        text: "安振龙",
      }, {
        label: "联系方式",
        text: "13628353926",
      }, ]
    }],

    //异常上报
    abnormalItems: [
    ],
    //评价星级
    commentAvatar: "../../images/avatar-sy.png",
    commentName: "张三",
    commentTime: "2018-01-15 09:26",
    commentStar: "star-4",
    commentRank: "非常好",
    commentWords: "发货速度很快，到货时积极联系，货物包装完好无损，数量无差，给快递员比个小心心❥(^_-)",
    commentImgs: [{
      img: "../../images/scene1.jpg"
    }, {
      img: "../../images/scene2.jpg"
    }],


    //电子回单
    stubCode: "../../images/barCode.jpg",
    stubItem: [{
      info: [{
        label: "货物名称",
        text: "普货",
      }, {
        label: "货物件数",
        text: "180",
      }]

    }, {
      info: [{
        label: "货物重量",
        text: "2637kg",
      }, {
        label: "货物体积",
        text: "4.8m³",
      }]
    }, ],

    stubBar: [{
      style: 1,
      bar: [{
        label: "揽件人",
        text: "安振龙",
      }, {
        label: "支付方式",
        text: "",
      }, {
        label: "发件人",
        text: "郭丽",
      }, {
        label: "签收人",
        text: "",
      }]
    }, {
      style: 0,
      bar: [{
        label: "承运商",
        text: "浙江乐清物流",
      }, {
        label: "创建时间",
        text: "2018-01-10 08：36",
      }, {
        label: "起运时间",
        text: "2018-01-11 16：50",
      }, {
        label: "备注",
        text: "",
      }]
    }, ],
    shareData: {
      orderId: "无",
      send: "无",
      sendAdd: "无",
      receive: "无",
      receiveAdd: "无",
      sendTime: "无",
    },
    shareResultImgPath: ''
  },



  //Tab选择
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },


  //跳转到异常详情页面
  toInfo: function(e) {
    wx.navigateTo({
      url: '../abnormalinfo/abnormalinfo'
    })
  },

  preview: function (e) {
    const index = e.currentTarget.dataset.index
    const currentImg = this.data.shoporderEvaluation.imgs[index]

    wx.previewImage({
      urls: this.data.shoporderEvaluation.imgs,
      current: currentImg
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const shopOrderId = options.id
    this.setData({ 
      shopOrderId
    })
    this.getShopOrderDetail(shopOrderId)
    this.getEvaluateList(shopOrderId)
    this.getReturnReceiptList(shopOrderId)
  },

  convert_length : function(length) {
    return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
  },

  createBarCode: function (id, content, width = 370, height= 100) {
    barcode.code128(wx.createCanvasContext(id), content, this.convert_length(width), this.convert_length(height))
  },

  getShopOrderDetail: function (shopOrderId) {
    wx.showLoading({
      title: '详情加载中...',
    })

    ajax.getApi('mini/program/order/getShopOrderDetail', {
      shopOrderId
    }, (err, res) => {
      console.log(res)
      wx.hideLoading()
      if (res && res.success) {
        const shoporderDetail = res.data
        if (shoporderDetail.start_departing_date_short) {
          shoporderDetail.start_departing_date_short = shoporderDetail.start_departing_date.substring(0, 10)
        }
        if (shoporderDetail.estimated_arriver_date_short) {
          shoporderDetail.estimated_arriver_date_short = shoporderDetail.estimated_arriver_date.substring(0, 10)
        }
        if (shoporderDetail.consigner_tel) {
          const consigner_tel = shoporderDetail.consigner_tel
          shoporderDetail.consigner_tel_hide = consigner_tel.length >= 11 ? consigner_tel.substring(0, 4) + "****" + consigner_tel.substring(8, 11) : consigner_tel
        }
        if (shoporderDetail.consignee_tel) {
          const consignee_tel = shoporderDetail.consignee_tel
          shoporderDetail.consignee_tel_hide = consignee_tel.length >= 11 ? consignee_tel.substring(0, 4) + "****" + consignee_tel.substring(8, 11) : consignee_tel
        }

        if (shoporderDetail.bill_no) {
          this.createBarCode('canvas', shoporderDetail.bill_no)
          // 
        }
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
          shoporderDetail,
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
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	

  },

  getEvaluateList: function (id) {
    ajax.getApi('mini/program/order/getEvaluateList', {
      id
    }, (err, res) => {
      console.log(res)
      if (res && res.success) {
        const shoporderEvaluation = res.data
        if (shoporderEvaluation) {
          const starNum = shoporderEvaluation.comment_star
          const commentRank = starMap.get(starNum)
          shoporderEvaluation.commentRank = commentRank
          shoporderEvaluation.commentStar = 'star-' + starNum
        }
        this.setData({
          shoporderEvaluation
        })
      } else {
        // wx.showToast({
        //   title: res.text,
        //   duration: 1000
        // })
      }
    })	

  },

  getReturnReceiptList: function (id) {
    ajax.getApi('mini/program/order/getReturnReceiptList', {
      id
    }, (err, res) => {
      console.log(res)
      if (res && res.success) {
        const returnReceipt = res.data
      
        this.setData({
          returnReceipt
        })
      } else {
        // wx.showToast({
        //   title: res.text,
        //   duration: 1000
        // })
      }
    })	

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
      title: this.data.shoporderDetail.area_name,
      path: '/pages/first/first?q=' + url,
      imageUrl: this.data.shareResultImgPath
    }
  }
})