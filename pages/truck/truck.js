// pages/truck/truck.js
var plateli = [];
const app = getApp()
const util = require('../../utils/util.js')
const coordtransform = require('../../utils/coordtransform.js')
const ajax = require('../../utils/ajax.js')
const QQMapWX = require('../qqmap/qqmap-wx-jssdk.js');
const demo = new QQMapWX({
  key: app.globalData.qqMapKey // 必填 换成自己申请到的
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qqMapKey: app.globalData.qqMapKey,
    locationDetail: {
      lat: 0, //车辆定位纬度
      lon: 0, //车辆定位经度
      adr: '', //车辆地理位置名称
      utc: '', //车辆定位时间
      spd: '', //速度
      drc: '', //方向
      province: '', //省
      city: '', //市
      country: '', //县
    },
    locationMarkers:[{

    }],
    firstTruck: 0,

    Rule: [{
      info: "您好！感谢您选择XXXX运输有限公司（以下简称我公司）。",
      indent: true,
    }, {
      info: "请您在使用货车定位查询功能前仔细阅读本服务条款，您阅读并确认后，说明：您同意遵守我公司公示的查询条款的相关内容，且愿意遵守或协同遵循一下条款的服务约定。",
      indent: true,
    }, {
      info: "1 货车定位查询费用"
    }, {
      info: "1.1货车定位查询功能按次数计费，一次0.1元"
    }, {
      info: "1.2同一车牌号查询时间不同，仍计入次数"
    }, {
      info: "1.3查询一次，可以看到货车从出发到当前位置所有轨迹图形及文字说明。"
    }, {
      info: "2 支付费用说明"
    }, {
      info: "2.1查询一次费用从账户余额扣除，使用此功能时请确保账户余额充足"
    }, {
      info: "2.2后续可能会添加包月功能，敬请期待"
    }, ],

    hideClear:true,
    map: "../../images/map.jpg",
    plates: "沪C123456",
    speed: "120",
    location: "浙江丽水长深高速",
    longitude: "119.65",
    latitude: "29.08",
    direction: "西北",
    time: "2018-12-24 08:56:23",
    hideInfo: true,
    hideShadow: true,
    hideTruck: true,
    plateFrist: [{
      name: "京"
    }, {
      name: "津"
    }, {
      name: "沪"
    }, {
      name: "渝"
    }, {
      name: "冀"
    }, {
      name: "豫"
    }, {
      name: "鲁"
    }, {
      name: "晋"
    }, {
      name: "陕"
    }, {
      name: "皖"
    }, {
      name: "苏"
    }, {
      name: "浙"
    }, {
      name: "鄂"
    }, {
      name: "湘"
    }, {
      name: "赣"
    }, {
      name: "闽"
    }, {
      name: "粤"
    }, {
      name: "桂"
    }, {
      name: "琼"
    }, {
      name: "川"
    }, {
      name: "贵"
    }, {
      name: "云"
    }, {
      name: "辽"
    }, {
      name: "吉"
    }, {
      name: "黑"
    }, {
      name: "蒙"
    }, {
      name: "甘"
    }, {
      name: "宁"
    }, {
      name: "青"
    }, {
      name: "新"
    }, {
      name: "藏"
    }, ],
    truckOrder: 0,
    plateOther: [{
      name: "A"
    }, {
      name: "B"
    }, {
      name: "C"
    }, {
      name: "D"
    }, {
      name: "E"
    }, {
      name: "F"
    }, {
      name: "G"
    }, {
      name: "H"
    }, {
      name: "J"
    }, {
      name: "K"
    }, {
      name: "L"
    }, {
      name: "M"
    }, {
      name: "N"
    }, {
      name: "P"
    }, {
      name: "Q"
    }, {
      name: "R"
    }, {
      name: "S"
    }, {
      name: "T"
    }, {
      name: "U"
    }, {
      name: "V"
    }, {
      name: "W"
    }, {
      name: "X"
    }, {
      name: "Y"
    }, {
      name: "Z"
    }, {
      name: "1"
    }, {
      name: "2"
    }, {
      name: "3"
    }, {
      name: "4"
    }, {
      name: "5"
    }, {
      name: "6"
    }, {
      name: "7"
    }, {
      name: "8"
    }, {
      name: "9"
    }, {
      name: "0"
    }, ],
    platetwo: plateli,
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


  //同意条款
  agreeRule: function(e) {
    this.setData({
      firstTruck: 1
    })
    wx.setStorageSync('firstTruck', 1)
  },



  //打开车牌号弹窗
  showTruck: function (e) {
    this.setData({
      hideTruck: false,
    })
  },

  //选择车牌号首位
  selectFrist: function (e) {
    var index = e.currentTarget.dataset.index
    var name = this.data.plateFrist[index].name
    this.setData({
      fristIndex: index,
      plateone: name,
      hideClear: false,
      placeholder: false
    })
  },

  //选择车牌号下一步
  nextPlate: function (e) {
    if (this.data.fristIndex != undefined && this.data.fristIndex != 99) {
      this.setData({
        truckOrder: 1
      })
    }
  },
  //选择车牌号剩余位数
  selectOther: function (e) {
    var index = e.currentTarget.dataset.index
    var name = this.data.plateOther[index].name
    plateli.push(name)
    var platetwo = plateli.join('')
    this.setData({
      platetwo: platetwo,
      plateli: plateli
    })
  },

  //删除
  deleteTruck: function (e) {
    if (this.data.truckOrder == 0) {
      this.setData({
        fristIndex: 99,
        plateone: '',
      })
    } else {
      var length = plateli.length
      plateli.splice(length - 1, 1);
      var platetwo = plateli.join('')
      this.setData({
        platetwo: platetwo,
        plateli: plateli
      })
    }

  },

  //关闭弹窗
  hide: function (e) {
    this.setData({
      hideTruck: true
    })
  },


  sureTruck: function (e) {
    this.setData({
      hideTruck: true,
      truckOrder: 0, //下次打开弹窗复位
    })
  },


  //车辆当前信息弹窗
  hideInfo: function (e) {
    this.setData({
      hideInfo: true
    })
  },

  showInfo: function (e) {
    this.setData({
      hideInfo: false
    })
  },

  //清空选择
  clearTruck: function (e) {
    plateli = [];
    this.setData({
      fristIndex: '99',
      plateone: '',
      platetwo: '',
      hideTruck: true,
      truckOrder: 0, //下次打开弹窗复位
      hideClear: true,
      placeholder: true
    })
  },



  //行驶轨迹
  truckcallout: function (e) {
    wx.navigateTo({
      url: '../truckTrail/truckTrail'
    })
  },

  //根据车牌号查询货车信息
  searchTruck: function (e) {
    this.setData({
      locationDetail: {},
      locationMarkers: []
    }, () => {
      wx.showLoading({
        title: '查询中...',
      })

      const vclN = this.data.plateone + this.data.platetwo
      ajax.getApi('mini/program/member/queryTruckLocation', {
        vclN,
      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          if (res.data.status === 1001) {
            const result = res.data.result
            //后台返回坐标为原始坐标，需除以60W，才是正常的84坐标系
            result.lon /= 600000
            result.lat /= 600000
            //微信小地图只支持火星坐标系，因此84坐标系需转成火星坐标系
            const tLocation = coordtransform.wgs84togcj02(result.lon, result.lat)
            
            const rotate = - ((360 - 90) - parseInt(result.drc))
            result.utc = util.getFormatDate(1, result.utc)
            result.drc = this.getDrcText(result.drc)
            this.setData({
              locationDetail: result,
              locationMarkers: [{
                id: vclN,
                width: 30,
                height: 30,
                longitude: tLocation[0],
                latitude: tLocation[1],
                iconPath: '../../images/truck2.png',
                rotate,
                callout: {
                  content: " 车牌号码：" + vclN
                    + "\n 当前车速：" + result.spd + "km/h"
                    + "\n 位置信息：" + result.province + result.city + result.country
                    + "\n 行驶方向：" + result.drc
                    + "\n 更新时间：" + result.utc,
                  fontSize: "11",
                  borderRadius: "10",
                  bgColor: "#ffffff",
                  padding: "10",
                  display: "ALWAYS",
                  textAlign: "left"  //左对齐
                }
              }],
              hideInfo: false

            })
          } else {
            wx.showToast({
              title: '查询出错',
              duration: 1000
            })
          }

        } else {
          if (res.text) {
            if(res.text == 1006) {
              wx.showToast({
                title: '车辆无信息',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: res.text,
                duration: 1000
              })
            }
          }
        }
      })	
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
    var first = wx.getStorageSync('firstTruck')
    this.setData({
      firstTruck: first,
      plateone: '',
      platetwo: '',
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    plateli = []
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