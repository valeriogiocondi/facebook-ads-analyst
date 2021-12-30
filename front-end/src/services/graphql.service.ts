// UTILS
import { configServer } from '../config';

// SERVICE
import LoginService from "./login.service";
import MessageQueue from './messageQueue.service';


class GraphqlService {

    async fetch(queryGraphql: string, params: any, callback?: Function): Promise<any> {
        
        MessageQueue.publish('OPEN_LOADER');

        return await fetch(configServer.ADDR_GRAPHQL, {
            method: 'POST',
            headers: {
                Authorization: `${ await LoginService.generateToken() }`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: queryGraphql,
                variables: params,
            }),
        })
        .then((res) => {
            
            MessageQueue.publish('CLOSE_LOADER');
            callback && callback();
            return res.json();
            
        }).catch((err) => {
            
            MessageQueue.publish('CLOSE_LOADER');
            console.error(err)
        });
    }   
}

// SINGLETON
// Export an instance of the class directly
export default new GraphqlService();
