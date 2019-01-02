// pages/punch/punch.js
var app = getApp()

Page({
  data: {
    sendTime: '',
    EndTime: '',
    clock: '',
    punch: [],
  },


  /* 毫秒级倒计时 */
  countDown: function() {
    var that = this
    var startDate = that.data.EndTime.split(/[^0-9]/)
    var clockTime = new Date(startDate[0], startDate[1] - 1, startDate[2], startDate[3], startDate[4], startDate[5]);

    //倒计时毫秒
    var duringMs = clockTime.getTime() - (new Date()).getTime();

    // 渲染倒计时时钟
    that.setData({
      clock: that.format(duringMs)
    });

    if (duringMs <= 0) {
      that.setData({
        clock: "已缺席"  //punch数组添加新的第几次签到、本次缺席数据
      });
      // timeout则跳出递归
      return;
    }
    setTimeout(function() {
      // 放在最后--
      duringMs -= 10;
      that.countDown();
    }, 10)

  },



  /* 格式化倒计时 */
  format: function(micro_second) {
    var that = this
    // 秒数
    var second = Math.floor(micro_second / 1000);
    // 小时位
    var hr = that.fillzero(Math.floor(second / 3600));
    // 分钟位
    var min = that.fillzero(Math.floor((second - hr * 3600) / 60));
    // 秒位
    var sec = that.fillzero(second % 60); // equal to => var sec = second % 60;
    return hr + ":" + min + ":" + sec + " ";

  },

  /* 分秒位数补0 */
  fillzero: function(num) {
    return num < 10 ? "0" + num : num
  },




  onLoad: function(options) {
    this.setData({
      sendTime: '2018-12-20 18:47:08',
      punch: [{
        num: "1",
        limit: "2018-12-20 19:47:08",
        time: "2018-12-20 19:45:00",
        location: "浙江乐清物流网点",
      }, {
        num: "2",
        limit: "2018-12-20 20:47:08",
        time: "2018-12-20 20:40:00",
        location: "浙江杭州物流网点",
      }, {
        num: "3",
        limit: "2018-12-20 21:47:08",
        over: true,
      }],
      EndTime: '2018-12-20 22:47:08', //第一次打卡是发货时间小时+1，第二次是发货时间小时+2，以此类推，一趟最多打卡10次
    })
    this.countDown()
  },

  onReady: function() {
    // 页面渲染完成




  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },



})