import { takeEvery, call } from 'redux-saga/effects';

// GRAPHQL
import BatchJobListExcutedSelectQueryGraphQL from '../../../_model/relay/query/BatchJobExecutedListSelectQuery';

// SERVICE
import GraphqlService from '../../../services/graphql.service';
import ReduxService from '../../../services/redux.service';


export function* batchJobExecutedWorker() {
  
  type Param = { payload: any, type: string };
  function* worker(arg: Param): Generator<any, any, any> {
  
    try {

      const res = yield call(GraphqlService.fetch, BatchJobListExcutedSelectQueryGraphQL, arg.payload.values);

      // save response into redux
      ReduxService.action('SET_BATCH_JOB_EXECUTED', res);
      
    } catch(error) {
      
      console.error(error);
    }
  };

  yield takeEvery('GET_BATCH_JOB_EXECUTED', worker);
}
