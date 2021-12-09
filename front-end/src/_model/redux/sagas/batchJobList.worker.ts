import { takeEvery, call } from 'redux-saga/effects';

// GRAPHQL
import BatchJobListSelectQueryGraphQL from '../../../_model/relay/query/BatchJobListSelectQuery';

// SERVICE
import RelayService from '../../../services/relay.service';
import ReduxService from '../../../services/redux.service';


export function* batchJobListWorker() {
  
  type Param = { payload: any, type: string };
  function* worker(arg: Param): Generator<any, any, any> {
  
    try {

      const res = yield call(RelayService.fetch, BatchJobListSelectQueryGraphQL, arg.payload.values);

      // save response into redux
      ReduxService.action('SET_BATCH_JOB_LIST', res);
      
    } catch(error) {
      
      console.error(error);
    }
  };

  yield takeEvery('GET_BATCH_JOB_LIST', worker);
} 
