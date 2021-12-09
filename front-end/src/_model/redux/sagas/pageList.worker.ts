import { takeEvery, call } from 'redux-saga/effects';

// GRAPHQL
import PageSocialListSelectQueryGraphQL from '../../../_model/relay/query/PageSocialListSelectQuery';

// SERVICE
import RelayService from '../../../services/relay.service';
import ReduxService from '../../../services/redux.service';


export function* pageListWorker() {
  
  type Param = { payload: any, type: string }
  function* worker(arg: Param): Generator<any, any, any> {
  
    try {

      const res = yield call(RelayService.fetch, PageSocialListSelectQueryGraphQL, arg.payload.values);

      // save response into redux
      ReduxService.action('SET_PAGE_LIST', res);
      
    } catch(error) {
      
      console.error(error);
    }
  };

  yield takeEvery('GET_PAGE_LIST', worker);
} 
