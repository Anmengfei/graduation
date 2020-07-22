// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    img: '../../icons/test.jpg',
    showTouxiang: false
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
 
  }



  
})
