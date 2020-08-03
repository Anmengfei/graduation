
//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function() {
    wx.cloud.init({
      env: 'jiancha-a6gjf',
      traceUser: true,

  })
    const _this = this
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code)
        
      }
    });
  },
  
 
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