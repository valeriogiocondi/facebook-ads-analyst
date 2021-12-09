import RestPaginatedParamsType from "../../types/rest-paginated-params.type";


export const getPageListAction = (params: RestPaginatedParamsType, callback?: Function) => {
  
  return {
    type:    'GET_PAGE_LIST',
    payload: { values: params, callback: callback }
  }
};

export const setPageListAction = (params: any, callback?: Function) => {
  
  return {
    type:    'SET_PAGE_LIST',
    payload: { values: params, callback: callback }
  }
};

export const getPageAction = (params: RestPaginatedParamsType, callback?: Function) => {
  
  return {
    type:    'GET_PAGE',
    payload: { values: params, callback: callback }
  }
};

export const setPageAction = (params: any, callback?: Function) => {
  
  return {
    type:    'SET_PAGE',
    payload: { values: params, callback: callback }
  }
};