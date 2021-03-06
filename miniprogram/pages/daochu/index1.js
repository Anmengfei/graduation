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
    
    wxappName: '页面生成图片',    //小程序名称
    shareImgPath: '',
    screenWidth: '',       //设备屏幕宽度
    shareImgSrc: '',
    content: '',
    color: 'black',
    sizeList: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    // size: 'medium',
    size: 14,
    noshow: true,
    openSettingBtnHidden: true
  },



  saveImageToPhotosAlbum1:function(e) {
    let that = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        console.log("1111111")
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              //这里是用户同意授权后的回调
              console.log("2222222")
              that.saveImageToPhotosAlbum();
            },
            fail() {//这里是用户拒绝授权后的回调
              console.log("33333333")
              that.setData({
                
                openSettingBtnHidden: false
              })
            }
          })
        } else {//用户已经授权过了
          console.log("4444444")
          that.saveImageToPhotosAlbum();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.infoShow();
    var that = this;
    console.log("onload:", options)
    that.setData({                             //this.setData的方法用于把传递过来的id转化成小程序模板语言
      backImg: options.backImg,     //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   {{b_id}}方法使用
      touxiang: options.touxiang,
      img: options.img,
      content: options.content
    })
    wx.getImageInfo({
      src: this.data.backImg,
      success: function (res) {
        console.log("测试res1", res)
        console.log(res)
       that.setData({
        //  shareImgSrc: 'https://zhongkeruitong.top/aiphoto/' + res.path
        backImg:  res.path
       });
      }
    })
    wx.getImageInfo({
      src: this.data.img,
      success: function (res) {
        console.log("测试res2", res)
        that.setData({
          // shareImgPath: 'https://zhongkeruitong.top/aiphoto/fengjing1.jpg' + res.path
          img:  res.path
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
  getList(str) {
    var i = 0;
    var list = [];
    while (i < str.length) {
      var str1 = "";

      for (var j = i; j < i + 20; j++) {
        if (j < str.length) {
          str1 = str1 + str[j];
        }
      }
      list.push(str1);
      i = i + 20;
    }
    console.log(list);
    return list
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
    // debugger
    console.log('开始保存合影了？')
   var that = this;
   
    var unit = that.data.screenWidth / 375
    console.log(22222222222222)
    that.setData({
      canvasHidden:false,
      noshow: false
    })
    //2. canvas绘制文字和图片
    const ctx = wx.createCanvasContext('share');
    var bgImgPath = that.data.backImg;
   

   
    console.log("bgImg", bgImgPath)
    console.log("Img", that.data.img)
 //这里很重要，主要就是布局
    console.log(222223333)
    ctx.drawImage(bgImgPath, 0, 0, 375, 580);
    //ctx.drawImage(that.data.shareImgPath, 50, 450, 284, 80);
    // ctx.drawImage(that.data.backImg, 146, 100, 150, 100);
    ctx.drawImage(that.data.touxiang, 246, 220, 80, 80, 80, 80);
    ctx.drawImage(that.data.img, 195, 250, 180, 240, 100);
    ctx.setFontSize(that.data.size)
    ctx.setFillStyle(that.data.color)
    // ctx.fillText( that.data.content, 100, 100)

    var text = that.data.content
    var row = that.getList(text)
    
   
    console.log("kankan", row)

    
    for (var b = 0; b < row.length; b++) {
      ctx.fillText(row[b], 10, 30 + b * 30, 300);
    }

    console.log(2444444)
    ctx.stroke()
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    wx.showToast({
      title: '分享图片生成中...',
      icon: 'loading',
      duration: 1000
    });
    console.log(5555555555)
    ctx.draw( false, (()  => {
      // 3. canvas画布转成图片
      console.log(2456789)
      // that.setData({
      //   canvasHidden:false
      // })
      console.log("huizhi")
      // that.setData({
      //   canvasHidden:false
      // })
      wx.canvasToTempFilePath({
        
        canvasId: 'share',
        
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log("success")
          console.log(tempFilePath);
          that.setData({
            shareImgSrc: tempFilePath,
            // maskHidden: false
            // canvasHidden: false,
            noshow: false
          });
          console.log(1)
          // wx.downloadFile({
          //   url: tempFilePath,
          //     success(res) {
          //       wx.saveImageToPhotosAlbum({
                  
          //         filePath: res.tempFilePath,
          //           success(res) {
          //             console.log(2)
          //             console.log(res)
          //           }
          //       })
          //     }
          // })

          wx.downloadFile({
            url: that.data.shareImgPath,　　　　　　　//需要下载的图片url
            success: function (res) {　　　　　　　　　　　　//成功后的回调函数
              console.log("下载1")
              console.log(res)
              wx.saveImageToPhotosAlbum({　　　　　　　　　//保存到本地
                filePath: tempFilePath,
                success(res) {
                  console.log("下载2")
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                  })
                },
                fail: function (err) {
                  console.log("下载3")
                  if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                    wx.openSetting({
                      success(settingdata) {
                        console.log(settingdata)
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                        } else {
                          console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                        }
                      }
                    })
                  }
                }
              })
            }
          });
          console.log("下载4")



          wx.hideToast()
        },
        fail: function (res) {
          console.log(res);
        },
        
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
    // wx.downloadFile({
    //   url: that.data.shareImgSrc,
    //   success: function (res) {
    //     that.data.shareImgSrc = res.tempFilePath
    //   }, fail: function (res) {
    //   }
    // })
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