import RestPaginatedParamsType from "../../types/rest-paginated-params.type";


export const getBatchJobParamsAction = (params: any, callback?: Function) => {

  return {
    type:    'GET_BATCH_JOB_PARAMS',
    payload: { values: params, callback: callback }
  }
};

export const setBatchJobParamsAction = (params: any, callback?: Function) => {

  return {
    type:    'SET_BATCH_JOB_PARAMS',
    payload: { values: params, callback: callback }
  }
};
