import { takeEvery, call } from 'redux-saga/effects';

// GRAPHQL
import PageSocialSelectQueryGraphQL from '../../../_model/relay/query/PageSocialSelectQuery';

// SERVICE
import GraphqlService from '../../../services/graphql.service';
import ReduxService from '../../../services/redux.service';


export function* pageWorker() {
  
  type Param = { payload: any, type: string }
  function* worker(arg: Param): Generator<any, any, any> {
  
    try {

      const res = yield call(GraphqlService.fetch, PageSocialSelectQueryGraphQL, arg.payload.values);

      // save response into redux
      ReduxService.action('SET_PAGE', res);
      
    } catch(error) {
      
      console.error(error);
    }
  };

  yield takeEvery('GET_PAGE', worker);
} 