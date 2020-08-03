const cloud = require('wx-server-sdk')


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV//默认环境配置，传入字符串形式的环境 ID 可以指定所有服务的默认环境，传入对象可以分别指定各个服务的默认环境
})

 
exports.main = async (event, context) => {
  const { value } = event;
  try {
    const res = await cloud.openapi.security.imgSecCheck({
      media: {
        header: {
          'Content-Type': 'application/octet-stream'},
        contentType: 'image/png',
        value: Buffer.from(value)
        }
      })
      console.log("云函数1")
    return res;
  } catch (err) {
    console.log("云函数2")
    return err;
  }
}