import { Config } from "Config.js";

class Base{
  constructor(){
    this.url = Config.APIv1Url;
  }

  request(params,callback){
    this.url += params.url;
    if(!params.method){
      params.method = "GET";
    }
    wx.request({
      url: this.url,
      method:params.method,
      success:function(res){
        callback && callback(res.data);
      }
    })
  }
}

export { Base }; 