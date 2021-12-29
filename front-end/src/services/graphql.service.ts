// UTILS
import { configServer } from '../config';

// SERVICE
import LoginService from "./login.service"


class GraphqlService {

    async fetch(queryGraphql: string, params: any, callback?: Function): Promise<any> {

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
            
            callback && callback();
            return res.json();
        });
    }   
}

// SINGLETON
// Export an instance of the class directly
export default new GraphqlService();
