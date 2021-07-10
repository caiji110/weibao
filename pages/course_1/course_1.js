// pages/course_1/course_1.js
// const app = getApp()
const SUBSCRIBE_ID = 'naJhPHuc4sqHpJluGER_f76XkAvU08O9btoYrgnQ4r0' 
var app = getApp(); //写在页面顶部page()外
let userInfoGetStatus = (app.globalData.userInfo == 0)
const db = wx.cloud.database()
let openId =wx.getStorageSync('openId')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // item:{
    //   ddd:4444
    // }
    userInfo: {
      
    },
    

    item: {
      hasUserInfo: false,

      courseInfo: {

      },
      user_info: {

      }



    }



  },
  subscribe_tap() {
    wx.requestSubscribeMessage({
      // 相当于询问用户愿不愿意接收这个模板的订阅消息	
      tmplIds: ['naJhPHuc4sqHpJluGER_f-TCpNsIS0Z1FDxr8w4reV8'],
      success(res) {
        console.log('已授权接收订阅消息')
      },
      complete(res) {
        console.log(res)
      }
    })
    this.setData({

      ['item.user_info.subscibe_status']: true
    })
    let openId = wx.getStorageSync('openId')
    console.log(openId);
    console.log(11);
    const dataIndex = 0
    db.collection('user_record').doc(openId).update({
      data: {
        ['usePerCourseDetail.' + [dataIndex] + '.subscibe_status']: true
      },
      success(res) {},
      fail(err) {}
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // 判断是否已经获取用户信息
    if (userInfoGetStatus) {
      this.setData({
        canIUseGetUserProfile: true,

      })
    } else {
      this.setData({
        ['item.userInfo']: app.globalData.userInfo,
        ['item.hasUserInfo']: true
      })
    }
    // 获取相应课程信息
    wx.cloud.database().collection('course_list').doc('course_1').get()
      .then(res => {
        console.log(res.data)
        this.setData({
          ['item.courseInfo']: res.data
        })
        console.log(this.data)
      }).catch(err => {
        console.log(err)
      })
    // 从用户user_record中获取用户的私人运动数据并放到data数据里面进行渲染
    let that = this
    let openId = wx.getStorageSync('openId')
    db.collection('user_record').where({
        _id: openId,

      })
      .get({
        success: function (res) {
          console.log("我成功了", res.data)
          let user_info = res.data[0].usePerCourseDetail[0]
          that.setData({
            ['item.user_info']: user_info
          })

        }

      })
  },
  jumpGetuserInfoCourse_1() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
       
        app.globalData.userInfo=res.userInfo
        app.globalData.userInfo=res.userInfo
        this.setData({
          ['item.userInfo']: res.userInfo,
          ['item.hasUserInfo']: true


      

        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_1_video',
    })

  },
  jumpGetuserInfoCourse_3() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_3_video',
    })

  },
  jumpGetuserInfoCourse_4() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_4_video',
    })

  },
  jumpGetuserInfoCourse_2() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_2_video',
    })

  },
  jumpGetuserInfoCourse_5() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_5_video',
    })

  },

  jumpToCourse_1() {
    wx.navigateTo({
      url: '/pages/course_video/course_1_video',
    })
  },
  jumpToCourse_2() {
    wx.navigateTo({
      url: '/pages/course_video/course_2_video',
    })
  },
  jumpToCourse_3() {
    wx.navigateTo({
      url: '/pages/course_video/course_3_video',
    })
  },
  jumpToCourse_4() {
    wx.navigateTo({
      url: '/pages/course_video/course_4_video',
    })
  },
  jumpToCourse_5() {
    wx.navigateTo({
      url: '/pages/course_video/course_5_video',
    })
  },
})