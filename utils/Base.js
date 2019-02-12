import { Config } from "Config.js";
import { Token } from "Token.js";

class Base{
  constructor(){
    this.url = Config.APIv1Url;
  }

  request(params, callback, noRefetch){
    var that = this;
    var url = this.url + params.url;
    if(!params.method){
      params.method = "GET";
    }
    wx.request({
      url: url,
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

  _refetch(params,callback){
    var token = new Token();
    token.getTokenFromServer((res)=>{
      this.request(params,callback,true);
    });
  }
  
}

export { Base }; 