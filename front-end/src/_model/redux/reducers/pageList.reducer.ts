import actionType from "../action.type";


export default (state = {}, action: actionType) => {

  switch (action.type) {

    case 'GET_PAGE_LIST': {

      return Object.assign({}, action.payload.values);
    }

    case 'SET_PAGE_LIST': {

      return Object.assign({}, action.payload.values);
    }

    default:
      return state
  }
};