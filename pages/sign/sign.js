// pages/sign/sign.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "18352790283072",
    time: "2018-01-10",
    start: "浙江温州",
    end: "湖北武汉",
    dispatch: "温州物流",
    dispatchTel: "18765243092", 
    receive: "武汉恒望科技有限公司",
    receiveTel: "13525362231",
    num: "210",
    actualNum: "210",
    startTime: "2018-01-11 12:53",
    expectedTime: "2018-01-15 18:00", //预计到达时间
    selectOrder:{},
    timelyArray: [{ //是否及时
      img: "../../images/check.png",
      text: "及时",
      value: 1
    }, {
      img: "../../images/uncheck.png",
      text: "不及时",
      value: 0
    }],
    operatingTime: undefined, //操作时间
    timelyIndex: 0,
    latitude: undefined,
    longitude: undefined,
    operator: undefined,
    signNow: undefined,
    actualNumber: undefined,
    actualDate: '2018-01-16',
    actualTime: undefined,
    timeliness: undefined, 
    now:undefined,
    shopOrderId: undefined,

    hide: true,
    hideCoupon: true,
    couponAmount: "10", //带红包的运单，不带就没有couponAmount、couponLimit的数据
    couponLimit: "30",
    hideTip: true,
  },

  signOrder: function () {
    const idList = this.data.shopOrderId
    const latitude = this.data.latitude
    const longitude = this.data.longitude
    const actualDate = this.data.actualDate
    const actual_arrive_date = this.data.actualDate + ' ' + this.data.actualTime
    const estimated_arriver_date = this.data.selectOrder.estimated_arriver_date
    const operatingTime = this.data.operatingTime
    const timely = this.data.timely

    if (util.compareDate(actual_arrive_date, operatingTime) > 0) {
      wx.showModal({
        title: '日期错误',
        content: '实际到货时间不得大于目前时间',
      })
      return;
    }

    if (estimated_arriver_date) {
      if (!timely && util.compareDate(estimated_arriver_date, actual_arrive_date) >= 0) {
        wx.showModal({
          title: '日期错误',
          content: '不及时的情况下实际到货时间不能小于等于预计到货时间',
        })
        return;
      }
    }

    if (this.data.latitude) {
      wx.showLoading({
        title: '正在签收中...',
        mask: true
      })
      ajax.postApi('mini/program/order/receiptShopOrder', {
        idList,
        location: longitude + ',' + latitude,
        actual_arrive_date: this.data.actualDate + ' ' + this.data.actualTime,
        sign_date: this.data.operatingTime,
        quantity: this.data.actualNumber,
        timeliness: this.data.timeliness,
      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          wx.showToast({
            title: '签收成功',
            success: function () {
              wx.reLaunch({
                url: '../home/home',
              })
            }
          })
        } else {
          wx.showToast({
            title: res.text || '500',
            duration: 1000
          })
        }
      })

    } else {
      wx.showToast({
        title: '坐标获取异常',
      })
    }
  },
  
  //打开日历
  showDate: function (e) {
    if (this.data.timely) {
      return;
    }
    wx.setStorageSync('timeindex', e.currentTarget.dataset.key)
    this.setData({
      showDate: true,
      hide: false,
    });
  },

  //异常类型
  bindTimeChange: function (e) {
    this.setData({
      actualTime: e.detail.value,
    })
  },

  //输入筛选条件
  bindActualNumberInput: function (e) {
    this.setData({
      actualNumber: e.detail.value
    })
  },
  //输入筛选条件
  bindOperatorInput: function (e) {
    this.setData({
      operator: e.detail.value
    })
  },

  // //及时不及时
  // selectRadio: function(e) {
  //   var orderRadio = this.data.orderRadio
  //   var index = e.currentTarget.dataset.index
  //   for (var i = 0; i < orderRadio.length; i++) {
  //     orderRadio[i].radio = "../../images/uncheck.png"
  //   }
  //   orderRadio[index].radio = "../../images/check.png"
  //   this.setData({
  //     orderRadio: orderRadio
  //   })
  // },

  selectRadio: function (e) {
    if (e.currentTarget.dataset.index === 0) {
      if (this.data.selectOrder.estimated_arriver_date) {
        const actualDate = this.data.selectOrder.estimated_arriver_date.substring(0, 10)
        const actualTime = this.data.selectOrder.estimated_arriver_date.substring(11)
        this.setData({
          actualDate,
          actualTime,
        })
      }
    }
    this.setData({
      timely: e.currentTarget.dataset.index === 0 ? true : false,
      timelyIndex: e.currentTarget.dataset.index,
      timeliness: this.data.timelyArray[e.currentTarget.dataset.index].value
    })

  },

  //签收
  toSelect: function(e) {
    if (this.data.couponAmount == undefined) {
      this.setData({
        hide: false,
        hideTip: false,
        id: "18352790283072",
      })
    } else {
      this.setData({
        hide: false,
        hideCoupon: false,
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


  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hideCoupon: true,
      hideTip: true,
    })
  },

  getLocation: function () {
    let latitude = this.data.latitude
    let longitude = this.data.longitude
    if (!latitude) {
      wx.getLocation({
        type: 'wgs84',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
        success: res => {
          console.log(res)
          latitude = res.latitude
          longitude = res.longitude
          this.setData({
            latitude,
            longitude
          })
        },
        fail: res => {
          wx.showModal({
            title: '坐标异常',
            content: '获取用户当前坐标失败,无法进行签收',
          })
        }
      })
    }
  },

  getShopOrderDetail(shopOrderId) {
    wx.showLoading({
      title: '运单加载中...',
    })
    ajax.getApi('mini/program/order/getShopOrderDetail', {
      shopOrderId
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        const selectOrder = res.data
        const isTimely = util.compareDate(selectOrder.estimated_arriver_date, this.data.operatingTime)
        this.setData({
          shopOrderId,
          selectOrder,
          actualNumber: selectOrder.total_packing_quantity,
          actualDate: this.data.operatingTime.substring(0, 10),
          actualTime: this.data.operatingTime.substring(11, 16),
          timely: isTimely >= 0,
          isHideTimeLy: isTimely >= 0,
          timeliness: isTimely >= 0 ? 1 : 0,
          timelyIndex: isTimely >= 0 ? 0 : 1,
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setNowDate()
    this.getLocation()
    const shoporderId = options.id
    this.getShopOrderDetail(shoporderId)
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

  },

    //选择日期
  dateSelectAction: function (e) {
    const key = wx.getStorageSync('timeindex')
    var cur_day = e.currentTarget.dataset.idx;
    var cur_date = cur_day + 1;
    var cur_month = this.data.cur_month;
    var cur_year = this.data.cur_year;
    if (cur_date < 10) {
      cur_date = "0" + cur_date
    }
    if (cur_month < 10) {
      cur_month = "0" + cur_month
    }

    this.data[key] = cur_year + "-" + cur_month + "-" + cur_date
    this.setData({
      todayIndex: cur_day,
      showDate: false,
      [key]: this.data[key]
    })

    this.setData({
      hide: true,
    })


  },


  //构造日历插件
  setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
    const todayIndex = date.getDate() - 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      cur_day,
      weeks_ch,
      todayIndex,
      operatingTime: util.formatDate()
    })
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }
    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },

})