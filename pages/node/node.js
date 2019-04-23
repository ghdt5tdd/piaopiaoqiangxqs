// pages/node/node.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodeHead: [{
      label: "商品编码",
      name: "EWHTCK0283"
    }, {
      label: "商品名称",
      name: "SC32*50S带磁气缸"
    }, {
      label: "剩余数量",
      name: "80"
    }, {
      label: "发货批次",
      name: "120 80"
    }, ],

    nodeList: [{
      pic: "../../images/node1.png",
      name: "下单",
      num: "500",
      transit: false,
      now: false,
    }, {
      pic: "../../images/node2.png",
      name: "工厂",
      num: "",
      transit: false,
      now: false,
      icon: "../../images/node-num.png",
    }, {
      num: "180",
      transit: true,
      now: false,
      icon: "../../images/node-num.png",
    }, {
      pic: "../../images/node3.png",
      name: "中央仓",
      num: "30",
      transit: false,
      now: false,
    }, {
      num: "120",
      transit: true,
      now: true,
      icon: "../../images/node-on.png",
    }, {
      pic: "../../images/node4.png",
      name: "区域仓",
      num: "",
      transit: false,
      now: false,
    }, {
      pic: "../../images/node5.png",
      name: "签收",
      num: "30",
      transit: false,
      now: false,
    }, {
      pic: "../../images/node6.png",
      name: "到达",
      num: "90",
      transit: false,
      now: false,
    }, ],


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
      'status': '中央仓出库',
      'detail': [{
        'loginfo': '您的货物已出库',
        'logdate': '2018-08-17',
        'logtime': '20:26',
      }, ],
    }, {
      'status': '发运单过帐',
      'detail': [{
        'loginfo': '',
        'logdate': '2018-08-17',
        'logtime': '08:08',
      }],
    }, {
      'status': '中央仓入库',
      'detail': [{
        'loginfo': '',
        'logdate': '2018-08-16',
        'logtime': '18:37',
      }],
    }, {
      'status': '工厂出库',
      'detail': [{
        'loginfo': '您的商品已生成完成，预交货时间：2018-08-16',
        'logdate': '2018-08-15',
        'logtime': '07:42',
      }],
    }, {
      'status': '生产排单',
      'detail': [{
        'loginfo': '',
        'logdate': '2018-08-12',
        'logtime': '18:37',
      }],
    }, {
      'status': '生产接单',
      'detail': [{
        'loginfo': '',
        'logdate': '2018-08-11',
        'logtime': '12:24',
      }],
    }, {
      'status': '订单下达',
      'detail': [{
        'loginfo': '',
        'logdate': '2018-08-09',
        'logtime': '20:45',
      }],
    }, ],


  },

  //查看实时定位
  toLoaction: function(e) {
    wx.navigateTo({
      url: '../location/location'
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