import { takeEvery, call } from 'redux-saga/effects';

// GRAPHQL
// import BatchJobSelectEditQueryGraphQL from '../../../_model/relay/query/BatchJobSelectEditQuery';
import selectEditQueryGraphQL from '../../../_model/relay/query/BatchJobSelectEditQuery';

// SERVICE
import GraphqlService from '../../../services/graphql.service';
import ReduxService from '../../../services/redux.service';


const TO_EXCLUDE = 'getBatchJobById';

export function* batchJobWorker() {
  
  type Param = { payload: any, type: string };
  function* worker(arg: Param): Generator<any, any, any> {
  
    try {

      const res = yield call(GraphqlService.fetch, selectEditQueryGraphQL, arg.payload.values);

      // save response into redux
      ReduxService.action('SET_BATCH_JOB', res.data[TO_EXCLUDE]);
      
      Object.keys(res.data).reduce((arr, key) => key !== TO_EXCLUDE && res.data[key]);
      ReduxService.action('SET_BATCH_JOB_PARAMS', res.data);
      
    } catch(error) {
      
      console.error(error);
    }
  };

  yield takeEvery('GET_BATCH_JOB', worker);
} 