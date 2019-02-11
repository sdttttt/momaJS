import { Base } from "../../utils/Base.js";

class indexService extends Base{
  
  constructor(){
    super();
  }

  getBannerAll(callback){
   var params = {
      "method" : "GET",
      "url" : "banner/1"
    };
    this.request(params,callback);
  }
}

export { indexService };