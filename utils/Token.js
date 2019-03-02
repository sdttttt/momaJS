import { Config } from "Config.js";

class Token{
  
  constructor(){
    // this.loginUrl = Config.APIv1Url + "login";
    this.loginUrl = Config.APIv1UrlJava + "login";
    // this.checkUrl = Config.APIv1Url + "verify";
    this.checkUrl = Config.APIv1UrlJava + "verify";
  }

  verify(callback){
    var token = wx.getStorageSync('token');
    if(!token){
      this.getTokenFromServer(callback);
    }else{
      this._verifyFromServer(token);
    }
  }  

  _verifyFromServer(token){
    var that = this;
    wx.request({
      url: that.checkUrl,
      method:"POST",
      header:{ token:token },
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