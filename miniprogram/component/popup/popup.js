Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '请填写给母校的毕业寄语'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '内容'
    },
    // 弹窗取消按钮文字
    btn_no: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    btn_ok: {
      type: String,
      value: '确定'
    } 
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    array: ['我向前的每一步，都离不开您的指引；我成长的每一厘，都离不开您的呵护', '玉兰花开，陪伴着我们一同聆听老师的谆谆教诲；银杏叶落，承载了我们这三年来多少的笑语欢歌。桃李不言，下自成蹊。母校，祝愿您明天更美好。', '学海无涯，有挚友相伴，一叶小舟也能渡海。风浪与晴好我们一起前进，欢笑与困难我们共同度过。'],
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    //展示弹框
    showPopup () {
      this.setData({
        flag: !this.data.flag
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error () {
      //触发取消回调
      this.triggerEvent("error")
    },
    _success () {
      //触发成功回调
      this.triggerEvent("success");
      console.log('输入内容：', this)
    },
    bindKeyInput: function (e) {
      // this.setData({
      //   inputValue: e.detail.value
      // })
      this.triggerEvent('contentEvent', { content: e.detail.value }); //这里giveFarther就是事件名，后面带着的就是传过去值
    },
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value], e.detail.value)
      this.setData({
        index: e.detail.value
      })
      this.triggerEvent('contentEvent', { content: this.data.array[e.detail.value] }); //这里giveFarther就是事件名，后面带着的就是传过去值
    },
  }
})