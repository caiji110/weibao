// pages/fitnessStart/fitnessStart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fitnessDetail:[{
      eventId:"tap1",
      name:"左脚开步",
      timelong:"00:39"
    },{
      eventId:"tap2",
      name:"平心静气",
      timelong:"01:04"
    },{
      eventId:"tap3",
      name:"扎步后瞧",
      timelong:"03:02"
    },{
      eventId:"tap4",
      name:"摇头摆尾",
      timelong:"05:52"
    },{
      eventId:"tap5",
      name:"展落两翅",
      timelong:"07:51"
    },{
      eventId:"tap6",
      name:"提肘巅足",
      timelong:"09:59"
    },{
      eventId:"tap7",
      name:"揉搓肚脐",
      timelong:"10:44"
    },{
      eventId:"tap8",
      name:"摆臂后划",
      timelong:"11:27"
    },{
      eventId:"tap9",
      name:"前后甩腿",
      timelong:"13:50"
    }],
    a:0,
    autoplay:true

  },
  jump(){
    wx.navigateTo({
      url: '/pages/completeTraining/completeTraining',
    })
  },
  videoJump(){
  this.videoContext.seek(100)
  },

  tap1(){
    this.videoContext.seek(39)
  },
  tap2(){
    this.videoContext.seek(64)
  },
  tap3(){
    this.videoContext.seek(182)
  },
  tap4(){
    this.videoContext.seek(352)
  },
  tap5(){
    this.videoContext.seek(471)
  },
  tap6(){
    this.videoContext.seek(559)
  },
  tap7(){
    this.videoContext.seek(644)
  },
  tap8(){
    this.videoContext.seek(687)
  },
  tap9(){
    this.videoContext.seek(830)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

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