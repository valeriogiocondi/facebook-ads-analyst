import RestPaginatedParamsType from "../../types/rest-paginated-params.type";


export const getBatchJobListAction = (params: RestPaginatedParamsType, callback?: Function) => {
  return {
    type:    'GET_BATCH_JOB_LIST',
    payload: { values: params, callback: callback }
  }
};

export const setBatchJobListAction = (params: any, callback?: Function) => {

  return {
    type:    'SET_BATCH_JOB_LIST',
    payload: { values: params, callback: callback }
  }
};
