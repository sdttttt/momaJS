import { Config } from "Config.js";

class Token{
  
  constructor(){
    this.loginUrl = Config.APIv1Url + "login";
    this.checkUrl = Config.APIv1Url + "verify";
  }

  verify(){
    var token = wx.getStorageSync('token');
    if(!token){
      this.getTokenFromServer();
    }else{
      this._verifyFromServer(token);
    }
  }  

  _verifyFromServer(token){
    var that = this;
    wx.request({
      url: that.checkUrl,
      method:"POST",
      data:{ token:token },
      success:function(res){
        var status = res.data.verify;
        if (!status){
          that.getTokenFromServer();
        }
        
      }
    })
  }

  getTokenFromServer(callback){
    var that = this;
    wx.login({
      success:function(res){
        wx.request({
          url: that.loginUrl,
          method:"POST",
          data:{ code:res.code },
          success:function(res){
            wx.setStorageSync("token",res.data.token);
            callback && callback(res.data.token);
          }
        });
      }
    });
  }
}

export { Token };