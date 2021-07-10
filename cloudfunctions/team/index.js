// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {teamID} = event;
  console.log('云函数被执行了');
  console.log(teamID);
  const db = cloud.database()
  let userinfo = ''

  userinfo = await db.collection("team_list").where({teamId: teamID}).get()
 
 
  return {
     resinfo:userinfo,
     a:'221'
  }
}