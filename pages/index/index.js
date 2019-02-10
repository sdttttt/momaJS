import { indexService } from "indexService.js";
import { Config } from "../../utils/Config.js";

var service = new indexService();

Page({
  
  data:{
    imgUrl:Config.imageUrl
  },

  onLoad:function(){
    wx.login({
      success:function(res){
        console.log(res.code);
      }
    });
    this.loadData();
  },

  loadData:function(){
    service.getBannerAll((data)=>{
      console.log(data);
      this.setData({
          banner:data.banner_item
      });
    });
  }

})
