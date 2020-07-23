// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    img: '../../icons/xiaofu1.jpg',
    showTouxiang: false,
    showSelect: false,
    opacity: 0,
    imgList: ['../../icons/xiaofu1.jpg', '../../icons/xiaofu2.png', '../../icons/xiaofu3.jpg', '../../icons/xiaofu4.jpg', '../../icons/xiaofu5.jpg', '../../icons/xiaofu6.png', '../../icons/xiaofu7.jpg', '../../icons/xiaofu8.png']
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
          img: res.tempFilePaths[0],
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
  gotoSelect: function(e) {
    this.setData({
      showSelect: true,
      opacity: 1,
      // display: block
    })
    console.log(e)
    console.log('test', this.showSelect)
  },
  handleImg: function(e) {
    const that = this
    // console.log(222, e)
    // console.log(this.imgList[2])
    this.setData({
      img: e.target.dataset.item,
      showSelect: false
    })
  }


  
})
