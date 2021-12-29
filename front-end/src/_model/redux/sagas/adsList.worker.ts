import { takeEvery, call } from 'redux-saga/effects';

// GRAPHQL
import adsListSelectQueryGraphQL from '../../../_model/relay/query/AdsListSelectQuery';

// SERVICE
import GraphqlService from '../../../services/graphql.service';
import ReduxService from '../../../services/redux.service';


export function* adsListWorker() {
  
  type Param = { payload: any, type: string };
  function* worker(arg: Param): Generator<any, any, any> {
  
    try {

      const res = yield call(GraphqlService.fetch, adsListSelectQueryGraphQL, arg.payload.values);

      // save response into redux
      ReduxService.action('SET_ADS_LIST', res);
      
    } catch(error) {
      
      console.error(error);
    }
  };

  yield takeEvery('GET_ADS_LIST', worker);
} 
