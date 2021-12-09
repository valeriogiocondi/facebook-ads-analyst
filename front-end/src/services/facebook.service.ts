// UTILS
import { configEndpoints } from '../config';

// SERVICE
import RestService from "./rest.service"


class FacebookService {

  async fetch(params: any): Promise<any> {
      
  return await RestService.get(configEndpoints.ADDR_FACEBOOK_API, params);
  }   
}


// SINGLETON
// Export an instance of the class directly
export default new FacebookService();