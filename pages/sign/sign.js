// pages/sign/sign.js
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
    actualTime: "2018-01-16 16:27", //实际到货时间
    orderRadio: [{ //是否及时
      radio: "../../images/uncheck.png",
      name: "及时"
    }, {
      radio: "../../images/check.png",
      name: "不及时"
    }],
    operatingTime: "2018-01-16 16:27", //操作时间 

    hide: true,
    hideCoupon: true,
    couponAmount: "10", //带红包的运单，不带就没有couponAmount、couponLimit的数据
    couponLimit: "30",
    hideTip: true,
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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