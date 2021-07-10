// pages/course_1_video/course_1_video.js
let user_detail = wx.getStorageSync('userInfo')
const db = wx.cloud.database()
let openId =  wx.getStorageSync('openId');
let myDate = new Date();
let teamId = wx.getStorageSync('teamId')
const {sleep} = require('../../utils/sleep.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {



    item: {

      button_status: true
    }

  },
  pause() {
    const TxvContext = requirePlugin("tencentvideo");
    let txvContext = TxvContext.getTxvContext('txv1')

    txvContext.pause();
    this.setData({
      ['item.button_status']: true
    })
  },
  play() {
    const TxvContext = requirePlugin("tencentvideo");
    let txvContext = TxvContext.getTxvContext('txv1')

    txvContext.play();
    this.setData({
      ['item.button_status']: false
    })

  },

  finish() {
    // 周进度条判断
    // 判断是否比前一天小
    
    console.log("执行finish,45")
    if(!this.data.user_info){
    wx.showToast({
      title: '数据库获取失败',
    })
  }
    let beforeDay = this.data.user_info.timeAnchor.day
    let beforeMonth = this.data.user_info.timeAnchor.month
    let nowDay = myDate.getDate();
    let nowMonth = myDate.getMonth();
    let myWeekDay = myDate.getDay();

    if (beforeMonth == nowMonth) {

      if (nowDay == beforeDay) {
        console.log("本日运动无需更改周数据库")
      } else {
        if (myWeekDay == 1) {
          const _ = db.command
          db.collection('user_record').doc(openId).update({
            data: {
              // 表示指示数据库将字段自增 10
              weekDayPercentageData: 14.3

            },
            success: function (res) {
              console.log(res.data)
            }
          })
        } else {
          const _ = db.command
          db.collection('user_record').doc(openId).update({
            data: {
              // 表示指示数据库将字段自增 10
              weekDayPercentageData: _.inc(14.3),
            },
            success: function (res) {
              console.log(res.data)
            }
          })
        }



      }
    } else {
      if (myWeekDay == 1) {
        const _ = db.command
        db.collection('user_record').doc(openId).update({
          data: {
            // 表示指示数据库将字段自增 10
            weekDayPercentageData: 14.3

          },
          success: function (res) {
            console.log(res.data)
          }
        })
      } else {
        const _ = db.command
        db.collection('user_record').doc(openId).update({
          data: {
            // 表示指示数据库将字段自增 10
            weekDayPercentageData: _.inc(14.3),
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      }

    }

    if (beforeMonth == nowMonth) {

      if (nowDay == beforeDay) {
        console.log("本日运动无需更改数据库")
      } else {
        const _ = db.command
        db.collection('user_record').doc(openId).update({
          data: {
            // 表示指示数据库将字段自增 10
            sportSumDay: _.inc(1),
            ['timeAnchor.day']: nowDay,
            ['timeAnchor.month']: nowMonth
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      }
    } else {
      const _ = db.command
      db.collection('user_record').doc(openId).update({
        data: {
          // 表示指示数据库将字段自增 10
          sportSumDay: _.inc(1),
          ['timeAnchor.day']: nowDay,
          ['timeAnchor.month']: nowMonth
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
    //获取该课程时间
    let timeLong = this.data.item.timeLong
    // 做数据更新
    const dataIndex = 0
    const _ = db.command
    db.collection('user_record').doc(openId).update({
      data: {
        // 表示指示数据库将字段自增 
        sportSumTimeLong: _.inc(timeLong),
        sumSportTimes: _.inc(1),
        ['usePerCourseDetail.' + [dataIndex] + '.excersize_times']: _.inc(1)

      },
      success: function (res) {
        console.log(res.data)
      }
    })
    if(this.data.user_info.sportTeamStatus){
      const _ = db.command
      db.collection('team_list').doc(teamId).update({
        data: {
          // 表示指示数据库将字段自增 
          minutes: _.inc(timeLong),
  
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
    console.log("执行finish_1,175")
    wx.navigateTo({
      url: '/pages/finish_page/finish_page_1',
    })

  },

  /**
   * 生命周期函数--监听页面加载11
   */
  onLoad:async function (options) {
    //useropenid（）.then的代码在useropenid之后执行此时缓存中已经有openid
    //其他代码没有改变。其他几个视频做类似的处理
    app.useropenid().then((res) => {
      openId =  wx.getStorageSync('openId');
      console.log(openId);
      console.log("我是useropenid"+res);
        db.collection('course_list').where({
          _id: "course_1" // 查询条件：chapter=1
        }).get().then(res => {
          
          //之后编写 需要利用返回数据的代码 看个人情况吧
          this.setData({
            item: res.data[0]
          })
          console.log(this.data)
        }).catch(err => {
          console.log(err) //打印错误信息
        })
        // 读取源数据库   
        db.collection('user_record').doc(openId).get().then(res => {
          // res.data 包含该记录的数据
          this.setData({
            user_info: res.data
          })
        })
        // 读取源数据库   
        db.collection('user_record').doc(openId).update({
          // data 传入需要局部更新的数据
          data: {
            user_detail:user_detail
            
          },
          success: function(res) {
            console.log(res.data)
          }
        })
    })
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    db.collection('user_record').doc(openId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        user_info:wx.getStorageSync('userInfo')
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  }
})
