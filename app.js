import { request } from "./request/index.js";
import regeneratorRuntime from './lib/runtime/runtime';
//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function() {
    const _this = this
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code)
        
      }
    });
  },
  // async getOpenid (val) {
  //   const getOpenidParams = {code: val}
  //   //  3 发送请求 获取用户的openid
  //   const res = await request({url:"/user/getXCXOpenid",data:getOpenidParams});
  //   // const openid = JSON.parse(res.data).openid
  //   // console.log('resp', JSON.parse(res.data).openid)
  //   console.log(res.data)
  //   wx.setStorageSync("openId", res.data);
  //   // wx.setStorageSync("openId", "oMXOb1fL8RtRe67m4Uf_3EPsdimE")
  // },

 
  onShow: function(options) {

  },
  onHide: function() {

  },
  onError: function(msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {

  }
 
});