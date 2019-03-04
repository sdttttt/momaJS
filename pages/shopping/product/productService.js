import { Base } from "../../../utils/Base.js";

class productService extends Base
{
  constructor(){
    super();
  }
  
  getProductInfo(id,callback){
    var params = {
      method : "GET",
      url : "product/" + id
    };

    this.request(params,callback);
  }
}

export { productService };