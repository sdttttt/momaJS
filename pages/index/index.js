import { indexService } from "indexService.js";
import { Config } from "../../utils/Config.js";

var service = new indexService();

Page({
  
  data:{
    imgUrl:Config.imageUrl,
    input:true
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
  },

  scan:function(){
    wx.scanCode({
    success:function(res){
      console.log(res);
    }  
    });
  },
  onInput:function(event){
    this.setData({
      input:false
    });
  },
  getInput:function(event){
    this.setData({
      inputValue:event.detail.value
    });
  },
  cancel:function(event){
    this.setData({
      input:true
    });
  },

  go:function(event){
    this.setData({
      input:true
    });
    var value = this.data.inputValue;
  }
})
