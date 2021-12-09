import RestPaginatedParamsType from "../../types/rest-paginated-params.type";


export const getBatchJobExecutedListAction = (params: RestPaginatedParamsType, callback?: Function) => {
  return {
    type:    'GET_BATCH_JOB_EXECUTED_LIST',
    payload: { values: params, callback: callback }
  }
};

export const setBatchJobExecutedListAction = (params: any, callback?: Function) => {

  return {
    type:    'SET_BATCH_JOB_EXECUTED_LIST',
    payload: { values: params, callback: callback }
  }
};

export const getBatchJobExecutedAction = (params: RestPaginatedParamsType, callback?: Function) => {
  return {
    type:    'GET_BATCH_JOB_EXECUTED',
    payload: { values: params, callback: callback }
  }
};

export const setBatchJobExecutedAction = (params: any, callback?: Function) => {

  return {
    type:    'SET_BATCH_JOB_EXECUTED',
    payload: { values: params, callback: callback }
  }
};
