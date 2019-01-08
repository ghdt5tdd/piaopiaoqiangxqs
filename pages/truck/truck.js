// pages/truck/truck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: "../../images/map.jpg",
    plates: "沪123456",
    speed: "80",
    location: "浙江金华长深高速",
    direction: "东北",
    time: "2018-12-24 08:56:23",
    hideInfo: false,
    vclN:'',
    locationDetail: {
      lat: '', //车辆定位纬度
      lon: '', //车辆定位经度
      adr: '', //车辆地理位置名称
      utc: '', //车辆定位时间
      spd: '', //速度
      drc: '', //方向
      province: '', //省
      city: '', //市
      country: '', //县
    }
  },



  hide: function(e) {
    this.setData({
      hideInfo: true
    })
  },

  show: function(e) {
    this.setData({
      hideInfo: false
    })
  },

  getDrcText(angle) {
    if (angle === 0 || angle === 360) {
      return '正北'
    } else if(angle > 0 && angle < 90){
      return '东北'
    } else if (angle === 90) {
      return '正东'
    } else if (angle > 90 && angle < 180) {
      return '东南'
    } else if (angle === 180) {
      return '正东'
    } else if (angle > 180 && angle < 270) {
      return '西南'
    } else if (angle === 270) {
      return '正西'
    } else if (angle > 270 && angle < 360) {
      return '西北'
    } else {
      throw new Error("error angle")
    }
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