// pages/homePage/homePage.js
var app = getApp(); //写在页面顶部page()外
const db = wx.cloud.database()
var myDate = new Date();
let openId = wx.getStorageSync('openId')

let userInfoGetStatus = (app.globalData.userInfo == 0)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseInfo: [],
    user_info: [],
    showOneButtonDialog: false,
      oneButton: [{text: '确定'}],
    U_status: "U"
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
let that = this
    // 判断是否已经获取用户信息
    if (userInfoGetStatus) {
      that.setData({
        U_statuse: "U",

      })
    } else {
      that.setData({
        U_statuse: "O",

      })
    }
  








    this.getopenid()
// 功能描述
// 从数据库中读取课程信息用于渲染页面

    db.collection('course_list').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data)
      let courseInfo = res.data
      this.setData({
        courseInfo: courseInfo
      })
    })
  //  功能描述：创建用户信息集合
  
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    



  },
  subscribe_toast(){
  //   this.setData({
  //     dialogShow: false,
  //     showOneButtonDialog: false
  // })
  this.setData({
    showOneButtonDialog: true
})
  },
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
},
getopenid(e) {
  let that = this;
  wx.cloud.callFunction({
    name: 'getOpenid',
    success: res => {
      console.log('本人openId', res.result.OPENID)
      wx.setStorageSync('openId', res.result.OPENID)


    },
    complete: res => {
      db.collection('user_record').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: res.result.OPENID, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          sportTeamLeaderStatus: false,
          sportTeamStatus: false,
          timeAnchor: {
            month: 5,
            day: 15,
            weekday: 0,
            weekReset: false
          },
          weekDayPercentageData: 0,
          usePerCourseDetail: [{
              courseId: 1,
              title: "八段锦",
              subscibe_status: false,
              excersize_times: 0,
              squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1.png"
            },
            {
              courseId: 2,
              title: "全面拉伸保健操",
              subscibe_status: false,
              excersize_times: 0,
              squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1 (2).png"
            },
            {
              courseId: 3,
              title: "肌肉关节活动操",
              subscibe_status: false,
              excersize_times: 0,
              squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1 (1).png"
            },
            {
              courseId: 4,
              title: "晨起唤醒活力运动",
              subscibe_status: false,
              excersize_times: 0,
              squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1 (3).png"
            },
            {
              courseId: 5,
              title: "睡前疲劳缓解拉伸",
              subscibe_status: false,
              excersize_times: 0,
              squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1 (4).png"
            }
          ],
          sportSumTimeLong: 0,
          sportSumDay: 0,
          sumSportTimes: 0
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      })
      console.log(999)
    }

  })

},


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    let openId = wx.getStorageSync('openId')
    db.collection('user_record').where({
        _id: openId,

      })
      .get({
        success: function (res) {
          console.log("我成功了", res.data)
          let user_info = res.data[0]
          that.setData({
            user_info
          })

        }

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

  },
  // 路由函数
  UjumpToCourse_1() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        
      }
    })
    wx.navigateTo({
      url: '/pages/course_1/course_1',
    })
  },
  UjumpToCourse_2() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        
      }
    })
    wx.navigateTo({
      url: '/pages/course_2/course_2',
    })
  },
  UjumpToCourse_3() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        
      }
    })
    wx.navigateTo({
      url: '/pages/course_3/course_3',
    })
  },
  UjumpToCourse_4() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        
      }
    })
    wx.navigateTo({
      url: '/pages/course_4/course_4',
    })
  },
  UjumpToCourse_5() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        
      }
    })
    wx.navigateTo({
      url: '/pages/course_5/course_5',
    })
  },




  OjumpToCourse_1() {
    
    wx.navigateTo({
      url: '/pages/course_1/course_1',
    })
  },
  OjumpToCourse_2() {
    wx.navigateTo({
      url: '/pages/course_2/course_2',
    })
  },
  OjumpToCourse_3() {
    wx.navigateTo({
      url: '/pages/course_3/course_3',
    })
  },
  OjumpToCourse_4() {
    wx.navigateTo({
      url: '/pages/course_4/course_4',
    })
  },
  OjumpToCourse_5() {
    wx.navigateTo({
      url: '/pages/course_5/course_5',
    })
  },


})