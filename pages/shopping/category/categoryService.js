import { Base } from "../../../utils/Base.js";

class categoryService extends Base{
	constructor(){
    super();
  }

  getCategoryAll(callback){
    var params = {
      method : "GET",
      url: "category/all"
    };
    
    this.request(params,callback);
  }
  
}

export { categoryService };