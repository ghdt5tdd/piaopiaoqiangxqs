// components/shareCanvas/shareCanvas.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shareData: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    draw: function (cb) {
      var that = this
      var ctx = wx.createCanvasContext('myCanvas', this)
      var scanW = wx.getSystemInfoSync().windowWidth


      //运单号
      ctx.setFontSize(18)
      var orderId = that.data.shareData.orderId
      var ohr = orderId.split(""); //这个方法是将一个字符串分割成字符串数组
      var temp = "";
      var row = [];
      for (var a = 0; a < ohr.length; a++) {
        if (ctx.measureText(temp).width < 0.8 * scanW - 30) {
          temp += ohr[a];
        } else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);

      //如果数组长度大于1 则截取
      if (row.length > 1) {
        var rowCut = row.slice(0, 2);
        row = rowCut[0] + "..."  //这里只显示一行，超出的截掉
      } else {
        row = row[0]
      }
      ctx.fillText('运单号:' + row, 10, 20, 0.8 * scanW - 20)
      ctx.stroke()



      //背景色块
      ctx.setFillStyle('#faaf18');
      ctx.fillRect(0, 30, 0.8 * scanW, 168);
      ctx.stroke()



      //寄件信息
      ctx.setFillStyle('#fff');
      ctx.setFontSize(17)
      ctx.fillText('寄', 17, 80)

      ctx.setFontSize(16)
      var send = that.data.shareData.send
      var shr = send.split(""); //这个方法是将一个字符串分割成字符串数组
      var temp = "";
      var row = [];
      for (var a = 0; a < shr.length; a++) {
        if (ctx.measureText(temp).width < 0.8 * scanW - 100) {
          temp += shr[a];
        } else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);

      //如果数组长度大于1 则截取
      if (row.length > 1) {
        var rowCut = row.slice(0, 2);
        row = rowCut[0] + "..." //这里只显示一行，超出的截掉
      } else {
        row = row[0]
      }
      ctx.fillText(row, 60, 53, 0.8 * scanW - 80)

      ctx.setFontSize(15)
      ctx.fillText(that.data.shareData.sendTel, 60, 78, 0.8 * scanW - 70)


      var sendAdd = that.data.shareData.sendAdd //这是要绘制的文本
      var chr = sendAdd.split(""); //这个方法是将一个字符串分割成字符串数组
      var temp = "";
      var row = [];
      ctx.setFontSize(15)
      ctx.setFillStyle('#fff');
      for (var a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < 0.8 * scanW - 70) {
          temp += chr[a];
        } else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);

      //如果数组长度大于1 则截取
      if (row.length > 1) {
        var rowCut = row.slice(0, 2);
        row = rowCut[0] + "..." //这里只显示一行，超出的截掉
      } else {
        row = row[0]
      }
      ctx.fillText(row, 60, 102, 0.8 * scanW - 80)
      ctx.stroke()

      //间隔线

      ctx.moveTo(60, 115);
      ctx.lineTo(0.8 * scanW - 20, 115);
      ctx.setStrokeStyle('#fff') //描边路径
      ctx.closePath()
      ctx.stroke()


      //收件信息
      ctx.setFontSize(17)
      ctx.setFillStyle('#fff');
      ctx.fillText('收', 20, 163)

      ctx.setFontSize(16)
      var receive = that.data.shareData.receive
      var rhr = receive.split(""); //这个方法是将一个字符串分割成字符串数组
      var temp = "";
      var row = [];
      for (var a = 0; a < rhr.length; a++) {
        if (ctx.measureText(temp).width < 0.8 * scanW - 100) {
          temp += rhr[a];
        } else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);

      //如果数组长度大于1 则截取
      if (row.length > 1) {
        var rowCut = row.slice(0, 2);
        row = rowCut[0] + "..." //这里只显示一行，超出的截掉
      } else {
        row = row[0]
      }
      ctx.fillText(row, 60, 138, 0.8 * scanW - 80)

      ctx.setFontSize(15)
      ctx.fillText(that.data.shareData.receiveTel, 60, 163, 0.8 * scanW - 70)

      var receiveAdd = that.data.shareData.receiveAdd //这是要绘制的文本
      var mhr = receiveAdd.split(""); //这个方法是将一个字符串分割成字符串数组
      var temp = "";
      var row = [];
      ctx.setFontSize(15)
      ctx.setFillStyle('#fff');
      for (var a = 0; a < mhr.length; a++) {
        if (ctx.measureText(temp).width < 0.8 * scanW - 70) {
          temp += mhr[a];
        } else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);

      //如果数组长度大于1 则截取
      if (row.length > 1) {
        var rowCut = row.slice(0, 2);
        row = rowCut[0] + "..." //这里只显示一行，超出的截掉
      } else {
        row = row[0]
      }
      ctx.fillText(row, 60, 187, 0.8 * scanW - 80)
      ctx.stroke()


      //寄件日期
      ctx.setFontSize(15);
      ctx.setFillStyle('#333');
      ctx.fillText('开单日期：' + that.data.shareData.sendTime, 10, 220)

 
      ctx.draw(false, function() {
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: function (res) {
              if (cb) {
                cb(res)
              }
            },
            fail: function (res) {
              console.log(res);
            }
          }, that);
      })

      //logo图片部分
      // setTimeout(function () {
 
      // }, 200);
    },
  }
})
