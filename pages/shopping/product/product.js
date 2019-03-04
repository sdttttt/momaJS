// pages/shopping/product/product.js
import { productService } from "productService.js";
import { Config } from "../../../utils/Config.js";

var service = new productService();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countRange: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 
    imageUrl : Config.imageUrl,
    productCount : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(options.id);
  },

  loadData : function(id){
    console.log(id);
    service.getProductInfo(id,(data) => {
      console.log(data);
      this.setData({
        data : data
      });
    });
  },
  
  onProductCountSelected : function(event){
    this.setData({
      productCount: this.data.countRange[event.detail.value]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})