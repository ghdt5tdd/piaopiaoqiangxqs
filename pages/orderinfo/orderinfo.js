// pages/orderinfo/orderinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideShadow: true,
    hideAbolish: true,

    abolish: [{
      pic: "../../images/uncheck.png",
      name: "重复下单/误操作"
    }, {
      pic: "../../images/uncheck.png",
      name: "地址错误"
    }, {
      pic: "../../images/uncheck.png",
      name: "报价不合理，有更优选择"
    }, {
      pic: "../../images/uncheck.png",
      name: "其他"
    }],
    selectabolish:'',
    
  },

  //拨打电话
  call: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },


  //取消下单
  cancel: function(e) {
    this.setData({
      hideShadow: false,
      hideAbolish: false,
    })
  },

  //选择取消原因
  selectabolish: function(e) {
    var abolish = this.data.abolish
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < abolish.length; i++) {
      abolish[i].pic = "../../images/uncheck.png"
    }
    abolish[index].pic = "../../images/check.png"
    var selectabolish = abolish[index].name

    this.setData({
      abolish: abolish,
      selectabolish: selectabolish
    })
  },

  //确认取消原因
  sure: function(e) {
    if (this.data.selectabolish == "") {
      wx.showToast({
        title: '请选择取消原因！',
        icon: 'none',
        duration: 3000,
      })
    } else {
      this.setData({
        hideShadow: true,
        hideAbolish: true,
        cancelReasons: this.data.selectabolish
      })

      wx.navigateBack({ //返回上页
        delta: 1
      })

    }

  },


  //关闭弹窗
  hide: function(e) {
    this.setData({
      hideShadow: true,
      hideAbolish: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      status: options.status,
      orderId: options.orderId,
      orderTime: options.orderTime,
      reciveName: '黄晓克',
      reciveTel: '13355888988',
      reciveLocation: '浙江省温州市鹿城区黎明工业区36号楼505室',
      forwarder:"浙江乐清物流公司",
      forwarderName: "安振龙",
      forwarderTel: "13628353926",
      cargoName: '电子',
      cargoNum: '1',
      cargoWeight: '0.6',
      cargoPack: '无',
      cargoNotice: '无',
      freight: '40',
      collect: '0',
      support: '2000',
      delivery: '5',
      cancelReasons: '地址错误', //已取消状态才有,其他状态不需要获取
      cancelTime: '2018-11-23 10:26',
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

  }
})