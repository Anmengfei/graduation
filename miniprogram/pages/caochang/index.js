// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
Page({
  data: {
    touxiang: '',
    img: 'https://zhongkeruitong.top/aiphoto/xiaofu1.jpg',
    backImg: 'https://zhongkeruitong.top/aiphoto/fengjing1.jpg',
    showTouxiang: false,
    showSelect: false,
    showSelectFengjing: false,
    opacity: 0,
    imgList: ['https://zhongkeruitong.top/aiphoto/xiaofu1.jpg', 'https://zhongkeruitong.top/aiphoto/xiaofu2.jpg', 'https://zhongkeruitong.top/aiphoto/xiaofu3.jpg', 'https://zhongkeruitong.top/aiphoto/xiaofu4.jpg', 'https://zhongkeruitong.top/aiphoto/xiaofu5.png', 'https://zhongkeruitong.top/aiphoto/xiaofu6.png',  'https://zhongkeruitong.top/aiphoto/xiaofu8.png'],

    backImgList: ['https://zhongkeruitong.top/aiphoto/fengjing1.jpg', 'https://zhongkeruitong.top/aiphoto/fengjing3.jpg', 'https://zhongkeruitong.top/aiphoto/fengjing4.jpg', 'https://zhongkeruitong.top/aiphoto/fengjing7.jpg', "https://zhongkeruitong.top/aiphoto/1.jpg","https://zhongkeruitong.top/aiphoto/2.jpg","https://zhongkeruitong.top/aiphoto/3.jpg","https://zhongkeruitong.top/aiphoto/4.jpg","https://zhongkeruitong.top/aiphoto/5.jpg","https://zhongkeruitong.top/aiphoto/6.jpg","https://zhongkeruitong.top/aiphoto/7.jpg","https://zhongkeruitong.top/aiphoto/8.jpg","https://zhongkeruitong.top/aiphoto/9.jpg"],
    // display: none,
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
    content: '',
    realLink: undefined,
    imageLink: undefined,
    openid: undefined
  },
  

  onShow: function(options) {
    var openid = wx.getStorageSync("openId")
    this.setData({
      openid: openid
    })
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    
      
  },
  async imageDeal(url) {
    var urlA = `/taq/imageDeal?url=${url}&openid=${this.data.openid}`
    const res = await request({url: urlA, method:"post"})
    console.log("获取处理过后的照片")
    console.log(res)
    console.log(res.data.proUrl)
    this.setData({
      showTouxiang: true,
      touxiang: res.data.proUrl
      
    })
  },
  

  
  

  chooseWxImage: function(type) {
    var that = this;
    console.log("云函数3")

  
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: [type],
      success: function(res) {
       //let base64 = 'data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
        
        console.log("云函数4")
        console.log(res);
        //console.log(base64)
        // that.checkFace(res.tempFilePaths[0])
        //  that.yasuotupian(res.tempFilePaths[0])
        // that.setData({
        //   showTouxiang: true,
        //   touxiang: res.tempFilePaths[0]
          
        // })
        wx.showToast({
          title: '正在处理图片，请稍后...',
          icon: 'none'
        })
        



wx.cloud.uploadFile({
  cloudPath: 'my-image' + res.tempFilePaths[0].match(/\.[^.]+?$/)[0],
  filePath: res.tempFilePaths[0],
  success: res1 => {
    wx.showToast({
      icon: 'none',
      title: '正在加载图片...',
    })
    console.log('上传成功：', res1)
    //test
    wx.cloud.getTempFileURL({
      fileList: [res1.fileID],
      success: resx => {
        console.log("获取真是链接",resx.fileList[0].tempFileURL)
        that.setData({
          realLink:resx.fileList[0].tempFileURL
        })
       
      }
    })
    
    wx.cloud.callFunction({
      name: 'check_img',
      data: {
        contentType: 'image/jpg',
        fileID: res1.fileID
      }
    }).then(res2 => {
      console.log("检测结果", res2.result);
      if (res2.result.errCode == '87014') {
        wx.showToast({
          icon: 'none',
          title: '图片含有敏感信息，换张图吧~',
        })
      } else {
        
        that.imageDeal(that.data.realLink)
        
        
      }
    })
  },
  fail: e => {
    console.error('上传失败：', e)
  }
 })

        

        // wx.getFileSystemManager().readFile({
        //   filePath: res.tempFilePaths[0],
        //   //encoding: 'base64', // 编码格式
        //   success: buffer => {
        //     console.log("云函数5")
        //     //console.log(buffer.data)
        //     wx.cloud.callFunction({
        //       name: 'check_img',
        //       data: {
        //         value: buffer.data
        //       }
        //     }).then(
              
        //       imgRes => {
        //         console.log('imgRes:',imgRes)
        //         if (imgRes.result.errCode == '87014') {
        //           wx.showToast({
        //             title: '图片含有违法违规内容',
        //             icon: 'none'
        //           })
        //           return
        //         } else {
        //           //图片正常

        //          console.log("测试111")
        //           that.setData({
        //             showTouxiang: true,
        //             touxiang: res.tempFilePaths[0]
                    
        //           })
        //           console.log("测试222")
        //         }

        //       }
        //     )
        //   },
        //   fail: err => {
        //     console.log("云函数6")
        //     console.log(err)
        //   }
        // })

      }
    })
  },
 

 
  chooseimage: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
 
  },
  

  goBack: function(){
    wx.navigateBack({
        delta: 1
    })
  },
  cancelSelect: function() {
    this.setData({
      showSelect: false,
    })
  },
  cancelSelectFengjing: function() {
    this.setData({
      showSelectFengjing: false,
    })
  },
  gotoSelect: function(e) {
    this.setData({
      showSelect: true,
      opacity: 1,
      // display: block
    })
    console.log(e)
    console.log('test', this.showSelect)
  },
  gotoSelectFengjing: function(e) {
    this.setData({
      showSelectFengjing: true,
      opacity: 1,
      // display: block
    })
    console.log(e)
    console.log('test', this.showSelectFengjing)
  },
  handleImg: function(e) {
    const that = this
    this.setData({
      img: e.target.dataset.item,
      showSelect: false
    })
  },
  handleBackImg: function(e) {
    const that = this
    this.setData({
      backImg: e.target.dataset.item,
      showSelectFengjing: false
    })
  },
  // 寄语弹框
  openConfirm: function () {
    this.setData({
        dialogShow: true
    })
  },
  tapDialogButton(e) {
      this.setData({
          dialogShow: false,
          showOneButtonDialog: false
      })
  },
  tapOneDialogButton(e) {
      this.setData({
          showOneButtonDialog: true
      })
  },
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
  },
 
  showPopup() {
    this.popup.showPopup();
  },
  getContent(e) {
    this.setData({
      content: e.detail.content
    })
    console.log('传过来的值', e)
  },
  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success(e) {
    console.log('你点击了确定', this.__data__.backImg);
    console.log('你点击了确定', this);
    this.popup.hidePopup();
    const that = this
    console.log('你点击了确定2');
    // wx.setStorage({
    //   backImg: JSON.stringify(that.backImg),
    //   touxiang: JSON.stringify(that.touxiang),
    //   img: JSON.stringify(that.img)
    // })
    console.log('你点击了确定3');
    console.log('/pages/daochu/index?backImg='+ that.__data__.backImg +'&touxiang=' + that.__data__.touxiang +'&img='+ that.__data__.img +'&content='+ that.__data__.content)
    wx.navigateTo({
      // url: '/pages/daochu/index'
      url: '/pages/daochu/index?backImg='+ that.__data__.backImg +'&touxiang=' + that.__data__.touxiang +'&img='+ that.__data__.img +'&content='+ that.__data__.content
    })
  }

  
})


