import { takeEvery, call } from 'redux-saga/effects';

// GRAPHQL
import adsQueryGraphQL from '../../../_model/relay/query/AdsSelectQuery';

// SERVICE
import RelayService from '../../../services/relay.service';
import ReduxService from '../../../services/redux.service';


export function* adsWorker() {
  
  type Param = { payload: any, type: string };
  function* worker(arg: Param): Generator<any, any, any> {
  
    try {

      const res = yield call(RelayService.fetch, adsQueryGraphQL, arg.payload.values);

      // save response into redux
      ReduxService.action('SET_ADS', res.data);
      
    } catch(error) {
      
      console.error(error);
    }
  };

  yield takeEvery('GET_ADS', worker);
} 