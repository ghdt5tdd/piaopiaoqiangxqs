// pages/send/send.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    WSend: true, //这里表示有设为默认的寄件地址
    WReceive: true,

    sendName: "", //设为默认的寄件地址信息
    sendTel: "",
    sendLocation: "",

    receiveName: "", //设为默认的寄件地址信息
    receiveTel: "",
    receiveLocation: "",

    carrier: undefined,
    WCargo: true,
    WService: true,

    cargoType: undefined,
    cargoNum: undefined,
    cargoPack: undefined,
    cargoVolumn: undefined,
    cargoWeight: undefined,
    cargoSelectMode: undefined,

    tServices:undefined,

    sendTime: "请选择提货时间（选填）",
    ruleStatus: false,
    ruleIcon: "../../images/uncheck.png",
    remark:'', 
    sendForwarder: "请选择承运商",
    hideShadow: true,
    hideTime: true,

    //预约时间
    calendar: [],
    width: 0,
    currentIndex: 0,
    currentTime: -1,
    timeArr: [{
      "timeEnd": "11:00",
      "overtime": false, //未超时可预约
    }, {
      "timeEnd": "13:00",
      "overtime": false,
    }, {
      "timeEnd": "15:00",
      "overtime": false,
    }, {
      "timeEnd": "17:00",
      "overtime": false,
    }, {
      "timeEnd": "19:00",
      "overtime": false,
    }, {
      "timeEnd": "21:00",
      "overtime": false,
    }, ],

    markFcous: false,

    hideRule: true,
    hideTip: true, //下单成功提示
    orderId: '',
    agreement: '',

  },

  bindInput(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key] : e.detail.value
    })
  },


  //寄件地址选择
  toSend: function(e) {
    wx.navigateTo({
      url: '../addSend/addSend?select=1'
    })
  },



  //收件地址选择
  toReceive: function(e) {
    wx.navigateTo({
      url: '../addSend/addSend?select=2'
    })
  },

  //货物信息
  toCargo: function(e) {
    const cargo = {
      cargoType: this.data.cargoType,
      cargoNum: this.data.cargoNum,
      cargoPack: this.data.cargoPack,
      cargoVolumn: this.data.cargoVolumn,
      cargoWeight: this.data.cargoWeight,
      cargoSelectMode: this.data.cargoSelectMode,
    }

    if (this.data.cargoType) {
      wx.navigateTo({
        url: '../cargo/cargo?cargo=' + JSON.stringify(cargo)
      })
    } else {
      wx.navigateTo({
        url: '../cargo/cargo'
      })
    }
  },

  //增值服务
  toService: function(e) {
    const tServices = this.data.tServices
    if(tServices) {
      wx.navigateTo({
        url: '../service/service?tServices=' + JSON.stringify(tServices)
      })
    }else {
      wx.navigateTo({
        url: '../service/service'
      })
    }

  },


  //承运商选择
  toforwarder: function (e) {
    wx.navigateTo({
      url: '../forwarder/forwarder'
    })
  },




  //预约时间
  showTime: function(e) {
    var that = this;
    that.setData({
      hideShadow: false,
      hideTime: false,
      markFcous: true,
    })


    function getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    }
    // 计算每月第一天是星期几
    function getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    }
    const date = new Date();
    const cur_year = date.getFullYear();
    let cur_month = date.getMonth() + 1;
    let cur_date = date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    if (cur_date < 10) {
      cur_date = "0" + cur_date
    }
    if (cur_month < 10) {
      cur_month = "0" + cur_month
    }
    //利用构造函数创建对象
    function calendar(date, week) {
      this.date = cur_year + '-' + cur_month + '-' + date;
      if (date == cur_date) {
        this.week = "今天";
      } else if (date == cur_date + 1) {
        this.week = "明天";
      } else {
        this.week = '星期' + week;
      }
    }
    //当前月份的天数
    var monthLength = getThisMonthDays(cur_year, cur_month)
    //当前月份的第一天是星期几
    var week = getFirstDayOfWeek(cur_year, cur_month)
    var x = week;
    for (var i = 1; i <= monthLength; i++) {
      //当循环完一周后，初始化再次循环
      if (x > 6) {
        x = 0;
      }
      //利用构造函数创建对象
      that.data.calendar[i] = new calendar(i, [weeks_ch[x]][0])
      x++;
    }
    //限制要渲染的日历数据天数为4天以内（用户体验）
    var flag = that.data.calendar.splice(cur_date, that.data.calendar.length - cur_date <= 3 ? that.data.calendar.length : 3)
    that.setData({
      calendar: flag
    })

    this.statusTime()
  },


  //超过时间变灰,除了今天都不会超时
  statusTime() {
    const date = new Date();
    const cur_hour = date.getHours() + ":" + date.getMinutes();
    let timeArr = this.data.timeArr
    for (var i = 0; i < timeArr.length; i++) {
      if (this.data.currentIndex == 0) {
        if (cur_hour > timeArr[i].timeBegin) {
          timeArr[i].overtime = true
        }
      } else {
        timeArr[i].overtime = false
      }
    }
    this.setData({
      timeArr: timeArr
    })
  },


  //选择日期点击事件
  select: function(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    this.statusTime()
  },

  //选择时间点击事件
  selectTime: function(e) {
    let timeArr = this.data.timeArr
    let index = e.currentTarget.dataset.tindex
    if (timeArr[index].overtime == false) {
      this.setData({
        currentTime: e.currentTarget.dataset.tindex
      })
    } else {
      return false
    }
  },

  //选择预约日期时间
  chooseTime: function(e) {
    var chooseDate = this.data.currentIndex
    var chooseTime = this.data.currentTime
    if (chooseTime == -1) {
      wx.showToast({
        title: '请选择配送时间~',
        icon: 'none',
        duration: 2000,
      })
    } else {
      var chooseSendDate = this.data.calendar[chooseDate].date
      // var chooseSendTime = this.data.timeArr[chooseTime].timeBegin + "-" + this.data.timeArr[chooseTime].timeEnd
      var chooseSendTime = this.data.timeArr[chooseTime].timeEnd
      this.setData({
        sendDate: chooseSendDate,
        sendTime: chooseSendTime,
        hideShadow: true,
        hideTime: true,
        markFcous: false,
      })
    }

  },


  //关闭配送时间弹窗
  hideTime: function(e) {
    this.setData({
      hideShadow: true,
      hideTime: true,
      markFcous: false,
    })
  },


  //查询条款按钮
  ruleCheck: function(e) {
    if (this.data.ruleStatus == false) {
      this.setData({
        ruleIcon: "../../images/check.png",
        ruleStatus: true
      })
    } else {
      this.setData({
        ruleIcon: "../../images/uncheck.png",
        ruleStatus: false
      })
    }

  },


  //打开服务条款弹窗
  showRule: function(e) {
    this.setData({
      hideShadow: false,
      hideRule: false,
      markFcous: true,
    })
  },

  //同意条款
  agreeRule: function(e) {
    this.setData({
      ruleIcon: "../../images/check.png",
      ruleStatus: true,
      hideShadow: true,
      hideRule: true,
      markFcous: false,
    })
  },



  //关闭服务条款弹窗
  hideRule: function(e) {
    this.setData({
      hideShadow: true,
      hideRule: true,
      markFcous: false,
    })
  },


  //下单成功提示
  submitOrder: function(e) {
    if (this.data.WSend == true) {
      wx.showToast({
        title: '请选择寄件地址！',
        icon: 'none',
        duration: 3000,
      })
      return false;

    } else if (this.data.WReceive == true) {
      wx.showToast({
        title: '请选择收件地址！',
        icon: 'none',
        duration: 3000,
      })
      return false;

    } else if (this.data.WCargo == true) {
      wx.showToast({
        title: '请填写货物信息！',
        icon: 'none',
        duration: 3000,
      })
      return false;

    } else if (this.data.ruleStatus == false) {
      wx.showToast({
        title: '请查询并同意服务条款！',
        icon: 'none',
        duration: 3000,
      })
      return false;

    } else {
      this.setData({
        hideShadow: false,
        hideTip: false,
        orderId: 'QY20181127542', //订单编号、下单时间这里是虚拟数据
        orderTime: '2018-11-27 12:30',
        markFcous: true,
      })

      wx.setStorageSync('hasOrder', true) //此时用户有运单了
    }
  },

  //再下一单
  hideTip: function(e) {
    this.setData({
      hideShadow: true,
      hideTip: true,
      markFcous: false,
    })
  },

  //查看订单
  toOrder: function(e) {
    this.setData({
      hideShadow: true,
      hideTip: true,
      markFcous: false,
    })
    //   wx.navigateTo({
    //     url: '../orderinfo/orderinfo?status=' + e.currentTarget.dataset.status + '&orderId=' + e.currentTarget.dataset.id + '&orderTime=' + e.currentTarget.dataset.time
    //   })
  },

  //关闭弹窗
  hide: function(e) {
    this.setData({
      hideShadow: true,
      hideTime: true,
      hideRule: true,
      hideTip: true,
      markFcous: false,
    })
  },

  getOrderAgreement() {
    ajax.getApi('mini/program/order/getOrderAgreement', {

    }, (err, res) => {
      if (res && res.success) {
        if (res.data.order_agreement) {
          this.setData({
            agreement: res.data.order_agreement
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
  onLoad: function(options) {
    this.getOrderAgreement()
    // this.getHedgingService()
    // this.getOrderAgreement()

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