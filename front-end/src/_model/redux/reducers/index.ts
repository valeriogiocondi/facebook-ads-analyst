import { combineReducers } from 'redux';
import themeReducer from './theme.reducer';
import pageListReducer from './pageList.reducer';
import pageReducer from './page.reducer';
import batchJobListReducer from './batchJobList.reducer';
import batchJobReducer from './batchJob.reducer';
import batchJobParamsReducer from './batchJobParams.reducer';
import batchJobExecutedListReducer from './batchJobExecutedList.reducer';
import batchJobExecutedReducer from './batchJobExecuted.reducer';
import AdsListReducer from './adsList.reducer';
import AdsReducer from './ads.reducer';


const reducers = combineReducers({

  themeReducer: themeReducer,
  
  pageListReducer: pageListReducer,
  pageReducer: pageReducer,

  batchJobListReducer: batchJobListReducer,
  batchJobReducer: batchJobReducer,
  batchJobParamsReducer: batchJobParamsReducer,
  
  batchJobExecutedListReducer: batchJobExecutedListReducer,
  batchJobExecutedReducer: batchJobExecutedReducer,
  
  AdsListReducer: AdsListReducer,
  AdsReducer: AdsReducer,
});

export default reducers;
