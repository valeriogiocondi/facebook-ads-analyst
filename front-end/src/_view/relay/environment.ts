import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { configServer } from '../../config';

// SERVICE 
import loginService from "../../services/login.service"

export default new Environment({

	/* 
	 * 	For more information
	 *
	 *	https://relay.dev/docs/en/relay-environment.html
	 *	https://relay.dev/docs/en/network-layer.html
	 *  https://relay.dev/docs/en/graphql-server-specification.html
	 *
	 */

	network: Network.create(
		async function(operation, variables) {

			return fetch(configServer.ADDR_GRAPHQL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${ await loginService.generateToken() }`,
				},
				body: JSON.stringify({
					query: operation.text,
					variables,
				}),
			}).then(response => {
				return response.json();
			});
  	}
	),
	store: new Store(new RecordSource()),  
});