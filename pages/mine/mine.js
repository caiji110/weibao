// pages/mine/mine.js
const db = wx.cloud.database()
let openId =wx.getStorageSync('openId')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('course_list').doc('medal_list').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        medal_list:res.data
      })
    })
    db.collection('user_record').doc(openId).get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        user_info:res.data
      })
    })
  },
  jumpToCreateSportsTeam(){
    wx.navigateTo({
      url: '/pages/teamInfoLoginForm/teamInfoLoginForm',
    })
  },

  jumpToCreateSportsTeamList(){
    let host = 1
    let teamID;
    console.log(3939393);
    console.log(wx.getStorageSync('teamId'));
    if(wx.getStorageSync('teamId')){
      //队伍的创建者
      teamID = wx.getStorageSync('teamId')
    }
    else{
      //跟从者
      teamID = wx.getStorageSync('teamID')
      host=0
    }
    
    wx.navigateTo({
      url: '/pages/memberlist/memberlist?&teamid='+teamID+"&"+'host='+host,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    db.collection('course_list').doc('medal_list').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        medal_list:res.data
      })
    })

    db.collection('user_record').doc(openId).get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        user_info:res.data
      })
    })
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