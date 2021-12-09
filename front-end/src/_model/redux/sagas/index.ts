import { put, takeEvery, all, call, takeLatest } from 'redux-saga/effects';

// PAGE WORKER
import { pageListWorker } from './pageList.worker';
import { pageWorker } from './page.worker';

// BATCH JOB WORKER
import { batchJobListWorker } from './batchJobList.worker';
import { batchJobWorker } from './batchJob.worker';
import { batchJobParamsWorker } from './batchJobParams.worker';

// BATCH JOB EXECUTED WORKER
import { batchJobExecutedListWorker } from './batchJobExecutedList.worker';
import { batchJobExecutedWorker } from './batchJobExecuted.worker';

// ADS WORKER
import { adsListWorker } from './adsList.worker';
import { adsWorker } from './ads.worker';


export default function* rootSaga() {
  yield all([
    pageListWorker(),
    pageWorker(),
    
    batchJobListWorker(),
    batchJobWorker(),
    batchJobParamsWorker(),
    
    batchJobExecutedListWorker(),
    batchJobExecutedWorker(),
    
    adsListWorker(),
    adsWorker(),
  ])
};