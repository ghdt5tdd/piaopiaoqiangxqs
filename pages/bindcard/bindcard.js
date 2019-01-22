// pages/bindcard/bindcard.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcard_front_img: "../../images/picface.jpg",
    idcard_reverse_img: "../../images/picback.jpg",
    driving_license_front_img: "../../images/drive1.jpg",
    driving_license_reverse_img: "../../images/drive2.jpg",
  },

  //上传身份证、驾驶证 
  changePicface: function (e) {
    var _this = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图
      sourceType: ['album', 'camera'],  // 指定来源是相册还是相机
      success: res => {
        util.ImgPathToBase64(res.tempFilePaths[0], base64 => {
          const idcard_front_img = 'data:image/png;base64,' + base64
          this.setData({
            idcard_front_img
          })
        })
      }
    })
  },

  changePicback: function (e) {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        util.ImgPathToBase64(res.tempFilePaths[0], base64 => {
          const idcard_reverse_img = 'data:image/png;base64,' + base64
          this.setData({
            idcard_reverse_img
          })
        })
      }
    })
  },


  changeDrive1: function (e) {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        util.ImgPathToBase64(res.tempFilePaths[0], base64 => {
          const driving_license_front_img = 'data:image/png;base64,' + base64
          this.setData({
            driving_license_front_img
          })
        })
      }
    })
  },


  changeDrive2: function (e) {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        util.ImgPathToBase64(res.tempFilePaths[0], base64 => {
          const driving_license_reverse_img = 'data:image/png;base64,' + base64
          this.setData({
            driving_license_reverse_img
          })
        })
      }
    })
  },




  //确认绑定
  toFirst: function(e) {
    const idcard_front_img = this.data.idcard_front_img
    const idcard_reverse_img = this.data.idcard_reverse_img
    const driving_license_front_img = this.data.driving_license_front_img
    const driving_license_reverse_img = this.data.driving_license_reverse_img
    wx.showLoading({
      title: '绑定中...',
    })

    ajax.postApi('mini/program/member/uploadLicense', {
      idcard_front_img,
      idcard_reverse_img,
      driving_license_front_img,
      driving_license_reverse_img
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '上传成功',
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	
  },



  getMyLicense() {
    wx.showLoading({
      title: '获取中...',
    })
    ajax.getApi('mini/program/member/myLicense', {

    }, (err, res) => {
      if (res && res.success) {
        wx.hideLoading()
        this.setData({

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
    this.getMyLicense()
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