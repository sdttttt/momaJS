// pages/shopping/product/product.js
import { productService } from "productService.js";
import { Config } from "../../../utils/Config.js";
import { cartService } from "../cart/cartService.js";

var service = new productService();
var cart = new cartService();

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

  //页面初始数据加载
  loadData : function(id){
    console.log(id);
    service.getProductInfo(id,(data) => {
      console.log(data);
      this.setData({
        data : data
      });
    });

    //购物车数量
    this.setData({
      cartProductCount: cart.getProductCount()
    });

  },
  
  //选择商品数量
  onProductCountSelected : function(event){
    this.setData({
      productCount: this.data.countRange[event.detail.value]
    });
  },

  //加入到购物车
  addCart : function(event){
    var object = {};
    var count = this.data.productCount;
    object.id = this.data.data.id;
    object.name = this.data.data.name;
    object.price = this.data.data.price;
    object.url = this.data.data.image.url;

    cart.add(object , count);

    this.setData({
      cartProductCount: this.data.cartProductCount += count
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