// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    touxiang: '',
    img: '../../icons/xiaofu1.png',
    backImg: '../../icons/fengjing1.jpg',
    showTouxiang: false,
    showSelect: false,
    showSelectFengjing: false,
    opacity: 0,
    imgList: ['../../icons/xiaofu1.png', '../../icons/xiaofu2.png', '../../icons/xiaofu3.png', '../../icons/xiaofu4.png', '../../icons/xiaofu5.png', '../../icons/xiaofu6.png', '../../icons/xiaofu7.png', '../../icons/xiaofu8.png'],

    backImgList: ['../../icons/fengjing1.jpg', '../../icons/fengjing2.jpg', '../../icons/fengjing3.jpg', '../../icons/fengjing4.jpg', '../../icons/fengjing5.jpg', '../../icons/fengjing6.jpg' ,'../../icons/fengjing7.jpg']
    // display: none
  },
  

  onShow: function(options) {
   
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    
      
  },
  chooseWxImage: function(type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        console.log(res);
        that.setData({
     // tempFilePath可以作为img标签的src属性显示图片
          showTouxiang: true,
          touxiang: res.tempFilePaths[0],
        })
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
    // console.log(222, e)
    // console.log(this.imgList[2])
    this.setData({
      img: e.target.dataset.item,
      showSelect: false
    })
  },
  handleBackImg: function(e) {
    const that = this
    // console.log(222, e)
    // console.log(this.imgList[2])
    this.setData({
      backImg: e.target.dataset.item,
      showSelectFengjing: false
    })
  }


  
})
