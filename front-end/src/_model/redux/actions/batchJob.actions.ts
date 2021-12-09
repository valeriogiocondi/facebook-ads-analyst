import RestPaginatedParamsType from "../../types/rest-paginated-params.type";


export const getBatchJobAction = (params: RestPaginatedParamsType, callback?: Function) => {
  return {
    type:    'GET_BATCH_JOB',
    payload: { values: params, callback: callback }
  }
};

export const setBatchJobAction = (params: any, callback?: Function) => {

  return {
    type:    'SET_BATCH_JOB',
    payload: { values: params, callback: callback }
  }
};
