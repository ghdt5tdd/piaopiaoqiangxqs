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
      ctx.fillRect(0, 30, 0.8 * scanW, 170);
      ctx.stroke()



      //寄件信息
      ctx.setFontSize(17)
      ctx.setFillStyle('#fff');
      ctx.fillText('收', 20, 80)
      ctx.setFontSize(17)
      ctx.fillText(that.data.shareData.send, 60, 55, 0.8 * scanW - 70)

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

      //如果数组长度大于2 则截取前两个
      if (row.length > 2) {
        var rowCut = row.slice(0, 2);
        var rowPart = rowCut[1];
        var test = "";
        var empty = [];
        for (var a = 0; a < rowPart.length; a++) {
          if (ctx.measureText(test).width < 0.8 * scanW - 100) {
            test += rowPart[a];
          } else {
            break;
          }
        }
        empty.push(test);
        var group = empty[0] + "..." //这里只显示两行，超出的用...表示
        rowCut.splice(1, 1, group);
        row = rowCut;
      }
      for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], 60, 80 + b * 20, 0.8 * scanW - 80);
      }
      ctx.stroke()

      //间隔线

      ctx.moveTo(60, 112);
      ctx.lineTo(0.8 * scanW - 20, 112);
      ctx.setStrokeStyle('#fff') //描边路径
      ctx.closePath()
      ctx.stroke()

      //收件信息
      ctx.setFontSize(17)
      ctx.setFillStyle('#fff');
      ctx.fillText('寄', 20, 165)
      ctx.setFontSize(17)
      ctx.fillText(that.data.shareData.receive, 60, 140, 0.8 * scanW - 70)

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

      //如果数组长度大于2 则截取前两个
      if (row.length > 2) {
        var rowCut = row.slice(0, 2);
        var rowPart = rowCut[1];
        var test = "";
        var empty = [];
        for (var a = 0; a < rowPart.length; a++) {
          if (ctx.measureText(test).width < 0.8 * scanW - 100) {
            test += rowPart[a];
          } else {
            break;
          }
        }
        empty.push(test);
        var group = empty[0] + "..." //这里只显示两行，超出的用...表示
        rowCut.splice(1, 1, group);
        row = rowCut;
      }
      for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], 60, 165 + b * 20, 0.8 * scanW - 80);
      }
      ctx.stroke()


      //寄件日期
      ctx.setFontSize(15);
      ctx.setFillStyle('#333');
      ctx.fillText('开单日期：' + that.data.shareData.sendTime, 20, 222)

 
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
