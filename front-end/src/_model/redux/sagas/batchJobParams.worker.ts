import { takeEvery, call } from 'redux-saga/effects';

// GRAPHQL
import selectNewQueryGraphQL from '../../../_model/relay/query/BatchJobSelectNewQuery';

// SERVICE
import GraphqlService from '../../../services/graphql.service';
import ReduxService from '../../../services/redux.service';


export function* batchJobParamsWorker() {
  
  type Param = { payload: any, type: string };
  function* worker(arg: Param): Generator<any, any, any> {
  
    try {

      const res = yield call(GraphqlService.fetch, selectNewQueryGraphQL, arg.payload.values);

      // save response into redux
      ReduxService.action('SET_BATCH_JOB_PARAMS', res.data);
      
    } catch(error) {
      
      console.error(error);
    }
  };

  yield takeEvery('GET_BATCH_JOB_PARAMS', worker);
} 