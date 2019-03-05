// pages/shopping/cart/cart.js
import { cartService } from "cartService.js";
import { Config } from "../../../utils/Config.js";

var service = new cartService();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl : Config.imageUrl,
    selectAll : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  loadData : function(){
    var products = service.getCartCache();
    this.setData({
      data : products
    }); 

    var price = this.productPrice();
    this.setData({
      productPrice: price.toFixed(2)
    });
  },

  //计算总价格
  productPrice : function(){
    var products = this.data.data;
    var price = 0;
    for(let key in products){
      price += products[key].price * products[key].count * 100;
    }
    return price / 100;
  },

  //单选点击事件
  onSelected : function(event){
    var index = event.currentTarget.dataset.index;
    this._selectedUpdate(index);
  },

  //更新选中信息
  _selectedUpdate : function(index){
    var data = this.data.data;
    var price = this.data.productPrice;
    data[index].selected = !data[index].selected;
    if (data[index].selected){
      price += (data[index].price*100 * data[index].count /100);
    }else{
      price -= (data[index].price * 100 * data[index].count / 100);
    }
    service.updataProductSelect(index);
    this.setData({
      data: data,
      productPrice: price
    });
  },

  //全选点击事件
  onSelectedAll : function(event){
    this.setData({
      selectAll : !this.data.selectAll
    });
    var products = this.data.data;
    if(this.data.selectAll){
      for( let key in products ){
        if(!products[key].selected){
          this._selectedUpdate(key);
        }
      }
    }else{
      for( let key in products ){
        if(products[key].selected){
          this._selectedUpdate(key);
        }
      }
    }
  },

  //删除选中商品
  onSelectDelete : function(event){
    var products = this.data.data;
    var index = 0;
    for(let key=0; key <= products.length ; key++){
      key -= index;
      index = 0;
      if(products[key].selected){
        console.log(products[key]);
        products.splice(key,1);
        index = 1;
      }
    }
    service.deleteProductSelect();
    this.setData({
      data : products
    });
  },

  //下单
  goWe: function (event) {
    var products = this.data.data;
    var order = {
      products : []
    };
    for( let key in products ){
      if(products[key].selected){
        var product = {};
        product.id = products[key].id;
        product.count = products[key].count;
        order.products.push(product);
      }
    }
    console.log(order);
    service.placeAnOrder(order,(data) => {
      console.log(data);
      if(data.status){
        wx.showModal({
          title: 'message',
          content: '下单成功,等待支付'
        })
      } 
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
    this.loadData();
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