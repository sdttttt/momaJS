import { Config } from "Config.js";
import { Token } from "Token.js";

class Base{
  constructor(){
    this.url = Config.APIv1UrlJava;
   // this.url = Config.APIv1Url;
  }

  request(params, callback, noRefetch){
    var that = this;
    var url = this.url + params.url;
    if(!params.data){
      var data = null;
    }else{
      var data = params.data;
    }
    if(!params.method){
      params.method = "GET";
    }
    wx.request({
      url: url,
      header:{
        token : wx.getStorageSync("token")
      },
      data : data,
      method:params.method,
      success:function(res){
          console.log(res);
        var code = res.statusCode.toString();
        var statusCode = code.charAt(0);
        console.log(statusCode);
        if(statusCode == '2'){
          callback && callback(res.data);
        }else if(code == "401"){
          if(!noRefetch){
            that._refetch(params,callback);
          }
        }
      },
      fail:function(err){
        console.log(err);
      }
    });
  }

  //状态码 401 重新获取token
  _refetch(params,callback){
    var token = new Token();
    token.getTokenFromServer((res)=>{
      this.request(params,callback,true);
    });
  }
  
}

export { Base }; 