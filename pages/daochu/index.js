// pages/daochu/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: true,     //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    backImg: 'https://zhongkeruitong.top/aiphoto/fengjing1.jpg',
    touxiang: '',
    img: 'https://zhongkeruitong.top/aiphoto/xiaofu1.jpg',
    canvasHidden: true,     //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    wxappName: '页面生成图片',    //小程序名称
    shareImgPath: '',
    screenWidth: '',       //设备屏幕宽度
    shareImgSrc: '',
    content: '',
    color: '',
    sizeList: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    // size: 'medium',
    size: 14
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
        console.log("测试res")
        console.log(res)
       that.setData({
        //  shareImgSrc: 'https://zhongkeruitong.top/aiphoto/' + res.path
        shareImgSrc:  res.path
       });
      }
    })
    wx.getImageInfo({
      src: this.data.img,
      success: function (res) {
        console.log(res)
        that.setData({
          // shareImgPath: 'https://zhongkeruitong.top/aiphoto/fengjing1.jpg' + res.path
          shareImgPath:  res.path
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
  changeColor: function() { // 修改字体颜色
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    // const color = 'rgba(' + r + ',' + g + ',' + b + ',0.6)'
    const color = 'rgb(' + r + ',' + g + ',' + b + ')'
    // const color = this.data.color == "red" ? "green":"red"
    this.setData({
      color: color
    })
  },
  changeBig: function() { // 放大
    const size = this.data.size += 1
    this.setData({
      size: size
    })
  },
  changeSmall: function() { // 缩小
    if (this.data.size > 9) {
      const size = this.data.size -= 1
      this.setData({
        size: size
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
  //   var that = this;
  //   var context = wx.createCanvasContext('share')
  //   context.setStrokeStyle("#00ff00")
  //   context.setLineWidth(1)
  //   context.stroke()
  //   context.draw(false, this.getTempFilePath)
  // },
 
  // //获取临时路径
  // getTempFilePath: function () {
  //   wx.canvasToTempFilePath({
  //     canvasId: 'share',
  //     success: (res) => {
  //       this.setData({
  //         shareTempFilePath: res.tempFilePath
  //       })
  //     }
  //   })
  // },
  //保存至相册
  saveImageToPhotosAlbum: function () {
    console.log('开始保存合影了？')
   var that = this;
   
    var unit = that.data.screenWidth / 375
    console.log(2222222)
    //2. canvas绘制文字和图片
    const ctx = wx.createCanvasContext('share');
    var bgImgPath = that.data.shareImgSrc;
    // var backImg = that.data.backImg,     //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   {{b_id}}方法使用
    // var touxiang = that.data.touxiang,
    // var img = that.data.img

    that.setData({
      canvasHidden:false
    })
    console.log("bgImg", bgImgPath)
    console.log("shareImg", that.data.shareImgPath)
 //这里很重要，主要就是布局
    console.log(222223333)
    ctx.drawImage(bgImgPath, 0, 0, 375, 580);
    //ctx.drawImage(that.data.shareImgPath, 50, 450, 284, 80);
    // ctx.drawImage(that.data.backImg, 146, 100, 150, 100);
    ctx.drawImage(that.data.touxiang, 246, 220, 80, 80, 80, 80);
    ctx.drawImage(that.data.shareImgPath, 195, 250, 180, 240, 100);
    ctx.setFontSize(30)
    ctx.setFillStyle('red')
    ctx.fillText( that.data.content, 100, 100)
    // ctx.font = '30px'
    // ctx.fillStyle= '#5e7436'
    // ctx.setFontSize(30)
    // ctx.setFillStyle('#5e7436')
    console.log(2444444)
    ctx.stroke()
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    wx.showToast({
      title: '分享图片生成中...',
      icon: 'loading',
      duration: 1000
    });
    console.log(5555555555)
    ctx.draw(true,  (()  => {
      // 3. canvas画布转成图片
      console.log(2456789)
      // that.setData({
      //   canvasHidden:false
      // })
      console.log("huizhi")
      wx.canvasToTempFilePath({
        
        canvasId: 'share',
        
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log("success")
          console.log(tempFilePath);
          that.setData({
            shareImgSrc: tempFilePath,
            // maskHidden: false
            canvasHidden:false
          });
          wx.hideToast()
        },
        fail: function (res) {
          console.log(res);
        }
      })
      console.log('zhuanhaunle')
    })());
  },
  /**
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {
    const that = this;
    console.log('meou')
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
  // onShow: function () {
  //   const that = this;
  //   wx.downloadFile({
  //     url: that.data.shareImgSrc,
  //     success: function (res) {
  //       that.data.shareImgSrc = res.tempFilePath
  //     }, fail: function (res) {
  //     }
  //   })
  // },

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