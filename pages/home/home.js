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
    billNo:'',
    orderCount:undefined,
    orderStatus: [{
      name: "待支付",
      value: 0,
      num: "1",
    }, {
      name: "待签收",
      value: 1,
      num: "2",
    }, {
      name: "待评价",
      value: 2,
      num: "1",
    }, {
      name: "已评价",
      value: 3,
      num: "3",
    }],
    page: 1,
    pageSize: 10,
    loadCompleted: false,
    selectStatus: 1,
    shopOrders:[],

    orderTable: [{
      id: "18352790280265",
      time: "2018-01-02",
      start: "浙江温州",
      end: "北京市",
      receive: "北京海淀雷蒙赛博机电技术有限公司",
      num: "150",
      payStyle: "到付",
      payAmount: "20.00",
      btn: "在线支付",
      open: "showPay",

      
    }, {
      id: "18352790283072",
      time: "2018-01-10",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "210",
      status: "红包奖励",
      btn: "一键签收",
      couponAmount: "10", //带红包的运单，不带就没有couponAmount、couponLimit的数据
      couponLimit: "30",
      open: "showSign",
    }, {
      id: "18352790280265",
      time: "2018-01-02",
      start: "浙江温州",
      end: "北京市",
      receive: "北京海淀雷蒙赛博机电技术有限公司",
      num: "150",
      status: "面单生成",
      btn: "一键签收", //不带红包运单
      open: "showSign",
    }, {
      id: "18352790283072",
      time: "2018-01-01",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "210",
      status: "一键签收",
      btn: "去评价",
      open: "showComment",
    }, {
      id: "18352790283072",
      time: "2018-01-01",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "120",
      status: "已评价",
    }, ],
    hide: true,
    hidePay: true,
    hideSign: true,
    hideCoupon: true,
    hideReceipt: true,
    receiptPic: "../../images/picture2.png",
    hideComment: true,
    hideTip: true,
  },

  bindCommentInput(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  toDetail(e){
    if (!app.globalData.memberInfo.phone) {
      wx.navigateTo({ //第一次登录需要绑定手机号，以后直接登录
        url: '../bind/bind'
      })
      return;
    }

    const index = e.currentTarget.dataset.index
    const shopOrder = this.data.shopOrders[index]
    if (shopOrder.consignee_tel && shopOrder.consignee_tel.indexOf(app.globalData.memberInfo.phone) === -1) {
      wx.showToast({
        title: '非收件人不能查看',
      })
      return;
    }
    wx.navigateTo({
      url: '../transportdetail/transportdetail?id=' + e.currentTarget.dataset.id,
    })
  },

  toNode(e){
    wx.navigateTo({
      url: '../point/point?id=' + e.target.dataset.id,
    })
  },

  confirmInput() {
    this.getShopOrderList(this.data.billNo)
  },

  showscan() {
    wx.scanCode({
      success: res => {
        const result = res.result
        this.setData({
          billNo: result
        }, () => {
          this.getShopOrderList(result)
        })
      }
    })
  },

  bindBillNo(e){
    this.setData({
      billNo: e.detail.value
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
        this.getShopOrderList()
      })

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })

    }
  },



  //打开在线支付弹窗
  showPay: function(e) {
    const amount = e.target.dataset.amount 
    const id = e.target.dataset.id 
    wx.navigateTo({
      url: '../pay/pay?amount=' + amount + '&id=' + id
    })
  },



  //打开签收弹窗
  showSign: function(e) {
    if (!app.globalData.memberInfo.phone) {
      wx.navigateTo({ //第一次登录需要绑定手机号，以后直接登录
        url: '../bind/bind'
      })
      return;
    }

    const id = e.target.dataset.id
    wx.navigateTo({
      url: '../sign/sign?id=' + id
    })
    // this.setData({
    //   hide: false,
    //   hideSign: false,
    //   //签收数据
    //   id: "18352790283072",
    //   time: "2018-01-10",
    //   start: "浙江温州",
    //   end: "湖北武汉", 
    //   dispatch: "温州物流",
    //   dispatchTel: "18765243092",
    //   receive: "武汉恒望科技有限公司",
    //   receiveTel: "13525362231",
    //   num: "210",
    //   actualNum: "210",
    //   startTime: "2018-01-11 12:53",
    //   expectedTime: "2018-01-15 18:00", //预计到达时间
    //   actualTime: "2018-01-16 16:27", //实际到货时间
    //   orderRadio: [{ //是否及时
    //     radio: "../../images/uncheck.png",
    //     name: "及时"
    //   }, {
    //     radio: "../../images/check.png",
    //     name: "不及时"
    //   }],
    //   operatingTime: "2018-01-16 16:27", //操作时间 
    // })

    // wx.setStorageSync('couponAmount', e.currentTarget.dataset.coupon) //存红包数据
  },


  //及时不及时
  selectRadio: function(e) {
    var orderRadio = this.data.orderRadio
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < orderRadio.length; i++) {
      orderRadio[i].radio = "../../images/uncheck.png"
    }
    orderRadio[index].radio = "../../images/check.png"
    this.setData({
      orderRadio: orderRadio
    })
  },

  //签收
  toSelect: function(e) {
    var couponAmount = wx.getStorageSync('couponAmount') //取红包数据
    if (couponAmount == '') {
      this.setData({
        hideSign: true,
        hide: false,
        hideTip: false,
        id: "18352790283072",
      })
    } else {
      this.setData({
        hideSign: true,
        hideCoupon: false,
        //红包数据
        couponAmount: "10",
        couponLimit: "30",
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


  //打开回单上传弹窗
  toReceipt: function(e) {
    this.setData({
      hideTip: true,
      hide: false,
      hideReceipt: false,
      //签收回单信息
      receiptName: "张三",
      receiptTel: "13525362231",
      receiptTime: "2018-01-16 16:27",
    })
  },


  //回单上传
  changeReceipt: function(e) {
    var _this = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 指定来源是相册还是相机
      success: function(res) {
        var tempFilePaths = res.tempFilePaths; //可以作为img标签的src属性显示图片
        _this.setData({
          receiptPic: tempFilePaths
        });
      }
    })
  },

  //打开评价弹窗
  showComment: function(e) {
    const index = e.target.dataset.index
    this.setData({
      hide: false,
      hideComment: false,
      selectIndex: index,
      selectOrder: this.data.shopOrders[index],
      //评价星级
      commentStar: [{
          pic: '../../images/eva-on.png',
          index: '0',
          checked: false
        },
        {
          pic: '../../images/eva-on.png',
          index: '1',
          checked: false
        },
        {
          pic: '../../images/eva-on.png',
          index: '2',
          checked: false
        },
        {
          pic: '../../images/eva-on.png',
          index: '3',
          checked: false
        },
        {
          pic: '../../images/eva-on.png',
          index: '4',
          checked: true
        },
      ],

      commentRank: "非常好",

      // marks: [{
      //     name: '0',
      //     value: ' 送货前联电 ',
      //     choose: false
      //   },
      //   {
      //     name: '1',
      //     value: ' 经同意放代收点 ',
      //     choose: false
      //   },
      //   {
      //     name: '2',
      //     value: ' 服务态度好 ',
      //     choose: false
      //   },
      //   {
      //     name: '3',
      //     value: '货品无破损 ',
      //     choose: false
      //   }
      // ],

      imgs: [],
    })

  },


  //评价星级选择
  changeEva: function (e) {
    var commentStar = this.data.commentStar;
    var checkIndex = e.currentTarget.dataset.index

    for (var i = 0; i < commentStar.length; i++) {
      if (i <= checkIndex) {
        commentStar[i].pic = "../../images/eva-on.png"
      } else {
        commentStar[i].pic = "../../images/eva-e.png"
      }
    }
    this.setData({
      commentStar: commentStar,
      starSelect: checkIndex + 1,
    });


    if (checkIndex == 4) {
      this.setData({
        commentRank: "非常好",
      });
    } else if (checkIndex == 3) {
      this.setData({
        commentRank: "较好",
      });
    } else if (checkIndex == 2) {
      this.setData({
        commentRank: "一般",
      });
    } else {
      this.setData({
        commentRank: "差",
      });
    }

  },



  //选择评价

  chooseMark: function(e) {

    const index = e.currentTarget.dataset.index;
    let marks = this.data.marks;
    const choose = marks[index].choose;
    marks[index].choose = !choose;

    const checked = marks[index].checked;
    marks[index].checked = !checked;

    this.setData({
      marks: marks
    });


    let sumc = "";
    for (let i = 0; i < marks.length; i++) {
      if (marks[i].choose == true) {
        sumc += marks[i].value;
      }
    }
    this.setData({
      comment: sumc
    });



  },




  //上传图片
  changePic: function (e) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        res.tempFilePaths.forEach(v => {
          util.ImgPathToBase64(v, base64 => {
            const imgs = this.data.imgs
            const img = 'data:image/png;base64,' + base64
            imgs.push(img)
            this.setData({
              imgs
            })
          })
        })
      }
    })

  },


  // 删除评价图片
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
    });
  },







  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hidePay: true,
      hideSign: true,
      hideCoupon: true,
      hideReceipt: true,
      hideComment: true,
      hideTip: true,
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

  commitComment: function () {
    const id = this.data.selectOrder.id
    const comment_star = this.data.starSelect || 5
    const comment = this.data.comment
    const imgs = JSON.stringify(this.data.imgs)

    if (comment === '') {
      wx.showToast({
        title: '请进行评价',
      })
    }
    wx.showLoading({
      title: '评价提交中...',
      mask: true
    })
    ajax.postApi('mini/program/order/evaluateShopOrder', {
      id,
      comment_content: comment,
      comment_star,
      imgs
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '提交成功',
        })
        this.data.shopOrders.splice(this.data.selectIndex, 1)
        this.setData({
          shopOrders: this.data.shopOrders,
        })
        this.hide()
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	
  },

  //选择状态
  selectStatus: function (e) {
    var index = parseInt(e.target.dataset.index);
    this.setData({
      selectStatus: index,
      billNo: '',
      page: 1,
      shopOrders: [],
      loadCompleted: false
    }, () => {
      this.getShopOrderList()
    })
  },

  getShopOrderCount() {
    ajax.getApi('mini/program/order/getMiniShopOrderCount', {}, (err, res) => {
      if (res && res.success) {
        const orderCount = this.data.orderCount
        if (!orderCount) {
          this.setData({
            orderCount: res.data.orderCount
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

  getShopOrderList(orderNo) {
    const page = this.data.page
    const pageSize = this.data.pageSize
    const state = this.data.selectStatus
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    const params = {
      page,
      pageSize,
      state,
    } 
    if(orderNo) {
      params.orderNo = orderNo
    }
    ajax.getApi('mini/program/order/getMiniShopOrderList', params, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.orderList.length > 0) {
          const shopOrders = this.data.shopOrders
          Array.prototype.push.apply(shopOrders, res.data.orderList)
          this.setData({
            shopOrders
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
      page++
      this.setData({
        page
      }, () => {
        this.getShopOrderList()
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
    this.loadUserInfo()
    util.callIf(() => {
      if (app.globalData.isBindPhone) {
        this.setData({
          page: 1,
          shopOrders: [],
          loadCompleted: false
        }, () => {
          this.getShopOrderList()
          this.getShopOrderCount()
        })
      }
    }, () => {
      return app.globalData.memberInfo !== null
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