import actionType from "../action.type";


export default (state = {}, action: actionType) => {

  switch (action.type) {

    case 'GET_BATCH_JOB_EXECUTED': {

      return Object.assign({}, action.payload.values);
    }

    case 'SET_BATCH_JOB_EXECUTED': {

      return Object.assign({}, action.payload.values);
    }
    
    default:
      return state
  }
};