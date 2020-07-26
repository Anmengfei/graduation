// pages/daochu/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: true,     //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    backImg: '../../icons/fengjing1.jpg',
    touxiang: '',
    img: '../../icons/xiaofu1.png',
    canvasHidden: true,     //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    wxappName: '页面生成图片',    //小程序名称
    shareImgPath: '',
    screenWidth: '',       //设备屏幕宽度
    shareImgSrc: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.infoShow();
    var that = this;
    console.log(options)
    that.setData({                             //this.setData的方法用于把传递过来的id转化成小程序模板语言
      backImg: options.backImg,     //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   {{b_id}}方法使用
      touxiang: options.touxiang,
      img: options.img,
      content: options.content
    })
    wx.getImageInfo({
      src: this.data.backImg,
      success: function (res) {
        console.log(res)
       that.setData({
         shareImgSrc: '../../' + res.path
       });
      }
    })
    wx.getImageInfo({
      src: this.data.touxiang,
      success: function (res) {
        console.log(res)
       that.setData({
         shareImgTouSrc: '../../' + res.path
       });
      }
    })
    wx.getImageInfo({
      src: this.data.img,
      success: function (res) {
        console.log(res)
        that.setData({
          shareImgPath: '../../' + res.path
        });
      }
    })

    //获取用户设备信息，屏幕宽度
    wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth
        })
        console.log(that.data.screenWidth)
      }
    })

  },
  goBack: function(){
    wx.navigateBack({
        delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var context = wx.createCanvasContext('share')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(1)
    context.stroke()
    context.draw(false, this.getTempFilePath)
  },
 
  //获取临时路径
  getTempFilePath: function () {
    wx.canvasToTempFilePath({
      canvasId: 'share',
      success: (res) => {
        this.setData({
          shareTempFilePath: res.tempFilePath
        })
      }
    })
  },
  /**
   * 绘制多行文本，由于文字比较多，这里我们写了一个函数处理
   */
  // drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
  //   var lineWidth = 0;
  //   var lastSubStrIndex = 0; //每次开始截取的字符串的索引
  //   for (let i = 0; i < str.length; i++) {
  //     lineWidth += ctx.measureText(str[i]).width;
  //     if (lineWidth > canvasWidth) {
  //       ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
  //       initHeight += 16; //16为字体的高度
  //       lineWidth = 0;
  //       lastSubStrIndex = i;
  //       titleHeight += 30;
  //     }
  //     if (i == str.length - 1) { //绘制剩余部分
  //       ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
  //     }
  //   }
  //   // 标题border-bottom 线距顶部距离
  //   titleHeight = titleHeight + 10;
  //   return titleHeight
  // },
 
  //保存至相册
  saveImageToPhotosAlbum: function () {
   var that = this;
    var unit = that.data.screenWidth / 375
    //2. canvas绘制文字和图片
    const ctx = wx.createCanvasContext('share');
    var bgImgPath = that.data.shareImgSrc;
    // var backImg = that.data.backImg,     //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   {{b_id}}方法使用
    // var touxiang = that.data.touxiang,
    // var img = that.data.img

 
 //这里很重要，主要就是布局
    ctx.drawImage(bgImgPath, 0, 0, 375, 580);
    ctx.drawImage(that.data.shareImgPath, 50, 450, 284, 80);
    ctx.drawImage(that.data.backImg, 146, 100, 150, 100);
    ctx.drawImage(that.data.touxiang, 146, 100, 200, 100);
    ctx.drawImage(that.data.img, 146, 100, 250, 100);
    ctx.fillText( that.data.content, 50, 241)
    ctx.setFontSize(13)
    ctx.setFillStyle('#5e7436')

    ctx.stroke()
    ctx.draw(false, function() {
      // 3. canvas画布转成图片
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 375,
        height: 580,
        destWidth: 375,
        destHeight: 580,
        canvasId: 'share',
        success: function (res) {
          console.log(res);
          that.setData({
            shareImgSrc: res.tempFilePath
          })
          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制中，请稍后重试',
              showCancel: false
            })
          }
          //4. 当用户点击分享到朋友圈时，将图片保存到相册
          // wx.saveImageToPhotosAlbum({
          //   filePath: that.data.shareImgSrc,
          //   success(res) {
          //     console.log(res);
          //     wx.showModal({
          //       title: '图片保存成功',
          //       content: '图片成功保存到相册了，去发圈噻~',
          //       showCancel: false,
          //       confirmText: '好哒',
          //       confirmColor: '#72B9C3',
          //       success: function (res) {
          //         if (res.confirm) {
          //           console.log('用户点击确定');
          //         }
          //         that.setData({
          //           canvasHidden: true
          //         })
          //       }
          //     })
          //   }
          // })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    });
  },
  /**
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {
    const that = this;
    wx.downloadFile({
      url: that.data.shareImgSrc,
      success: function (res) {
        that.data.shareImgSrc = res.tempFilePath
      }, fail: function (res) {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

    

  // },



  /**
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {
    const that = this;
    wx.downloadFile({
      url: that.data.shareImgSrc,
      success: function (res) {
        that.data.shareImgSrc = res.tempFilePath
      }, fail: function (res) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})