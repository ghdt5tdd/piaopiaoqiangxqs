// pages/reply/reply.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsReply: [{
      avatar: "../../images/friend3.png",
      name: "小熊饼干",
      time: "2019-07-25  15:32",
      info: "许多企业已经在探索解决“最先一公里”的问题。每年5月都是山东烟台樱桃成熟的季节，让全国尝上新鲜的烟台樱桃，就要依靠冷链物流。京东冷链连续4年推出“产地仓”这一创新仓储模式，将供应链环节前置到距离樱桃产地最近的地方，确保樱桃储存、售卖。",
    }, {
      avatar: "../../images/friend2.png",
      name: "尖叫的土拨鼠",
      time: "2019-07-25  15:32",
      info: "苏宁则是通过联合苏宁生鲜、苏宁拼购、中华特色馆等原产地直采，打通“最先一公里”，在重点特色产品区建立产地仓。据陈伟透露，苏宁今年计划布局山东苹果产地仓、乌鲁木齐和包头的牛羊肉产地仓、阳澄湖的大闸蟹产地仓等",
    }, {
      avatar: "../../images/friend1.png",
      name: "before",
      time: "2019-07-25  15:32",
      info: "对于生鲜产品来说，“最先一公里”更为重要。尤其是很多农产品，在采摘下来之后，如果保存方式不得当，会造成产品损耗，其新鲜度将大打折扣。等到运输到其他地方后，就失去了产品原有的价值。因此，冷链物流建设着重要解决“最先一公里”。",
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      Avatar: options.avatar,
      Name: options.name,
      Time: options.time,
      Info: options.info,
      Sum: options.sum,
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