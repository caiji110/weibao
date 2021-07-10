// pages/memberlist/memberlist.js

var app = getApp(); //写在页面顶部page()外
let userInfoGetStatus = (app.globalData.userInfo == 0)
let teamStatus = true
let openId = wx.getStorageSync('openId')
let teamID = wx.getStorageSync('teamId')

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // button弹窗数组
    user_info: {
      sportTeamStatus: true
    },
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
  },
  tapDialogButton(e) {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    console.log(e)
    if (e.detail.index == 1) {

      const _ = db.command
      db.collection('team_list').doc(teamID).update({
        data: {
          // 表示指示数据库将字段自增 10
          userInfo: _.push(userInfo)
        },
        success: function (res) {
          console.log(res.data)
        }
      })
      let userarray = that.data.teamInfo.userInfo
      userarray.push(userInfo)
      that.setData({
        ['teamInfo.userInfo']: userarray
      })


      console.log('确认')

    } else {




      console.log('取消')
    }



    this.setData({
      ['user_info.sportTeamStatus']: true,

    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //新增代码
    console.log(options);
    teamID = options.teamid
    let openId = wx.getStorageSync('openId')
    let {host}=options
    console.log(teamID);
    let resinfo='' 
    //用于存储渲染数据
    wx.setStorageSync('teamID', teamID)
    //拿到渲染数据
     let res=await wx.cloud.callFunction({
        name:"team",
        data:{
          teamID:teamID
        }
      })
      resinfo = res.result.resinfo.data
    //判断用户是从链接进入还是小程序内进入
    //小程序进入host=1链接进入host=0
      if(host==0){
        console.log("链接进入", options.teamid)
        //链接进入判断用户是否登录过，未登录过将数据写入数据库并提示授权信息。
        this.getopenid()
       }
    console.log(resinfo);
   if(resinfo.length!=0) this.setData({
    teamInfo: resinfo[0]
   })
   else{
     throw new Error("teamID输入错误或查无此数据")
   }
    // 检验是否授权
    if (userInfoGetStatus) {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(11)
          wx.setStorageSync('userInfo', res.userInfo)
          app.globalData.userInfo = res.userInfo
          this.setData({
            user_Info: res.userInfo,
            hasUserInfo: true
          })
        },
        complete: function (res) {
          console.log(999)
        }
      })



    } 
    else {
      let user_detail_info = app.globalData.userInfo
      this.setData({
        user_Info: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync('userInfo', user_detail_info)
    }

  },
  async getopenid(e) {
    console.log('我被调用了');
    let that = this;
    //拿到openid
    let res = await wx.cloud.callFunction({name: 'getOpenid'})
    wx.setStorageSync('openId', res.result.OPENID)
    console.log(res.result.OPENID);
   //调用云函数判断进来的用户是否为新用户，如果是新用户则将数据写入数据库并返回注册信息。
   let addres=await wx.cloud.callFunction({
      name:"adduser",
      data:{
      id:res.result.OPENID
      }})
      console.log(addres.result.message);
    //未注册则提示授权信息。
    if(addres.result.message=='未注册'){
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(11)
          wx.setStorageSync('userInfo', res.userInfo)
          app.globalData.userInfo = res.userInfo
          this.setData({
            user_Info: res.userInfo,
            hasUserInfo: true
          })
        },
        complete: function (res) {
          console.log(999)
        }
      })
    }
    console.log('执行完毕');
          // success: function (res) {
          //   // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          //   // 获取该运动队的信息
          //   console.log(200);
          //   db.collection('team_list').where({
          //     teamId: teamID
          //   }).get().then(res => {
          //     that.setData({
          //       teamInfo: res.data[0]
          //     })
          //     console.log(res.data) //打印返回结果
          //     //之后编写 需要利用返回数据的代码 看个人情况吧
          //   }).catch(err => {
          //     console.log("没有获得团队信息") //打印错误信息
          //   })
          // }
    //     })

      

    // })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let teamid = wx.getStorageSync('teamID')
 
    console.log(teamid);
    let title, imageUrl;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      title = "快来加入我的运动团！一起健康运动吧～"
      imageUrl = 'cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/forward/536b6797554640a4a66f831453883b9.png';
    } 
    if (res.from === 'menu') {
      title = "快来加入我们的运动队吧"
      imageUrl = 'cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/forward/536b6797554640a4a66f831453883b9.png';
    }
    return {
      title: title,
      imageUrl: imageUrl, //这个是分享的图片
      path: '/pages/memberlist/memberlist?host=0&teamid=' + teamid

    }


  }
})