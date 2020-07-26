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

    backImgList: ['../../icons/fengjing1.jpg', '../../icons/fengjing2.jpg', '../../icons/fengjing3.jpg', '../../icons/fengjing4.jpg', '../../icons/fengjing5.jpg', '../../icons/fengjing6.jpg' ,'../../icons/fengjing7.jpg'],
    // display: none,
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
    content: ''
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
