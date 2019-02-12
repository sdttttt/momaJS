import { Base } from "../../utils/Base.js";

class walletService extends Base{
  
  constructor(){
    super();
  }
  
  getMyWallet(callback){
    var params = {
      url:"user/wallet",
      method:"POST"
    };
    this.request(params,callback);
  }

}

export { walletService };