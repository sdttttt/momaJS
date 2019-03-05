import { Base } from "../../../utils/Base.js";

class cartService extends Base
{
  constructor(){
    super();
    this._cacheKey = "products";
  }

  //加入购物车
  add(object , count){
    if(count <= 0) return;

    var products = this.getCartCache();
    var result = this.hasCartProductID(object.id, products);
    if(result == -1){
      object.count = count;
      object.selected = true;
      products.push(object);
    }else{
      products[result].count += count;
    }
    wx.setStorageSync(this._cacheKey, products);
  }
  
  //获取购物车缓存
  getCartCache(){
    var res = wx.getStorageSync(this._cacheKey);
    if(!res) res = [];
    return res;
  }

  //检查购物车重复productID ，如果有， 返回下标
  hasCartProductID(id,products){
    for(let i = 0 ; i < products.length; i++){
      if(products[i].id == id){
        return i;
      }
    }
    return -1;
  }

  //获取购物车总商品数量
  getProductCount(){
    var count = 0;
    var products = this.getCartCache();
    if( products == [] ) return count;
    
    for(let key in products){
      count += products[key].count;
    }
    return count;
  }

  //更新缓存中商品选中状态
  updataProductSelect(index){
    var products = this.getCartCache();
    for( let key in products ){
      if( key == index){
        products[key].selected = !products[key].selected
        break;
      }
    }
    wx.setStorageSync(this._cacheKey, products);
  }

  //删除缓存中选中商品
  deleteProductSelect(){
    var products = this.getCartCache();
    var index = 0;
    for (let key = 0; key <= products.length; key++) {
      key -= index;
      index = 0;
      if (products[key].selected) {
        console.log(products[key]);
        products.splice(key, 1);
        index = 1;
      }
    }
    wx.setStorageSync(this._cacheKey, products);
  }

  placeAnOrder(data,callback){
    var params = {
      method : "POST",
      url : "order/make",
      data : data
    };
    
    this.request(params,callback);
  }
}

export { cartService };