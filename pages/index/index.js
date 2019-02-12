import { indexService } from "indexService.js";
import { Config } from "../../utils/Config.js";
import { Token } from "../../utils/Token.js";

var token = new Token();
var service = new indexService();

Page({
  
  data:{
    imgUrl:Config.imageUrl,
    input:true,
    loadHidden:false,
    
  },

  onLoad:function(){
    this.loadData();
    service.getUserInfo((res)=>{
      /*
              由于微信新政策
      不能依赖wx.getUserIngo 获取用户信息了
      但是这个接口还是可以用，
      授权改为使用button
      授权一次通过还是可以使用wx.getUserInfo
      获取用户信息
      */
      if(res.notUserInfo){
        this.setData({
          notUserInfo:res.notUserInfo
        });
      }else{
        this.setData({
          userInfo:res
        });
        //检查并获取令牌
        token.verify();
      }
    });
  },

  //加载所有数据
  loadData:function(){
    service.getBannerAll((data)=>{
      this.setData({
          banner:data.banner_item,
      });
    });
    //加载完成隐藏加载窗口
    this.setData({
      loadHidden: true
    });
  },


  //打开扫码功能
  scan:function(){
    wx.scanCode({
    success:function(res){
      console.log(res);
    }  
    });
  },

  //打开输入框
  onInput:function(event){
    this.setData({
      input:false
    });
  },

  //获取输入框中的编号
  getInput:function(event){
    this.setData({
      inputValue:event.detail.value
    });
  },

  //点击取消关闭 输入框
  cancel:function(event){
    this.setData({
      input:true
    });
  },
  
  //点击确认关闭输入框 
  go:function(event){
    this.setData({
      input:true
    });
    var value = this.data.inputValue;
  },
  //点击下面的小按钮 打开菜单
  jumpMenu:function(event){
    this.setData({
      userbtnStatus:true,
    });
  },
  //点击遮罩层关闭菜单
  closeMenu:function(event){
    this.setData({
      userbtnStatus:false
    });
  },

  //获取用户信息按钮
  onClickGetUserInfo:function(event){
    if(!event.detail.userInfo){
      
    }
  }
})
