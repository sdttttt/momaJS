import { Base } from "../../utils/Base.js";

class indexService extends Base{
  
  constructor(){
    super();
  }

  getBannerAll(callback){
   var params = {
      "method" : "GET",
      "url" : "banner/1"
    };
    this.request(params,callback);
  }

  getUserInfo(callback){
    wx.login({
      success:function(res){
        wx.getUserInfo({
          success:function(res){
            typeof callback == "function" && callback(res.userInfo);
          },fail:function(err){ 
            typeof callback == "function" && callback({
              avatarUrl: '../../icon/user@default.png',
              nickName: '还没有登录',
              notUserInfo:true
            }) 
            }
        });
      }
    });
  }
}

export { indexService };