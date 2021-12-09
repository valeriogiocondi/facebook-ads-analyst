import { storeThemeAction } from './theme.action';
import { getPageListAction, setPageListAction, getPageAction, setPageAction } from './pageList.actions';
import { getBatchJobListAction, setBatchJobListAction } from './batchJobList.actions';
import { getBatchJobAction, setBatchJobAction } from './batchJob.actions';
import { getBatchJobParamsAction, setBatchJobParamsAction } from './batchJobParams.actions';
import { getBatchJobExecutedListAction, setBatchJobExecutedListAction, getBatchJobExecutedAction, setBatchJobExecutedAction } from './batchJobExecutedList.actions';


export default {

  storeTheme: storeThemeAction,
  
  getPageList: getPageListAction,
  setPageList: setPageListAction,
  
  getPage: getPageAction,
  setPage: setPageAction,
  
  getBatchJobList: getBatchJobListAction,
  setBatchJobList: setBatchJobListAction,
  
  getBatchJob: getBatchJobAction,
  setBatchJob: setBatchJobAction,
  getBatchJobParams: getBatchJobParamsAction,
  setBatchJobParams: setBatchJobParamsAction,
  
  getBatchJobExecutedList: getBatchJobExecutedListAction,
  setBatchJobExecutedList: setBatchJobExecutedListAction,
  
  getBatchJobExecuted: getBatchJobExecutedAction,
  setBatchJobExecuted: setBatchJobExecutedAction,
};