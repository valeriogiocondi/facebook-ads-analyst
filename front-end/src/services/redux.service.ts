// REDUX - STORE
import reduxStore from '../_model/redux/redux-store';

// REDUX - ACTIONS
import reduxActions from '../_model/redux/actions';

class ReduxService  {

    action(type: string, payload?: any): void {

        switch (type) {

            case 'GET_PAGE_LIST': {
        
                return reduxStore.dispatch( reduxActions.getPageList(payload) );
            }

            case 'SET_PAGE_LIST': {
        
                return reduxStore.dispatch( reduxActions.setPageList(payload) );
            }

            case 'GET_PAGE': {
        
                return reduxStore.dispatch( reduxActions.getPage(payload) );
            }

            case 'SET_PAGE': {
        
                return reduxStore.dispatch( reduxActions.setPage(payload) );
            }

            case 'GET_BATCH_JOB_LIST': {
        
                return reduxStore.dispatch( reduxActions.getBatchJobList(payload) );
            }

            case 'SET_BATCH_JOB_LIST': {
        
                return reduxStore.dispatch( reduxActions.setBatchJobList(payload) );
            }

            case 'GET_BATCH_JOB': {
        
                return reduxStore.dispatch( reduxActions.getBatchJob(payload) );
            }

            case 'SET_BATCH_JOB': {
        
                return reduxStore.dispatch( reduxActions.setBatchJob(payload) );
            }

            case 'GET_BATCH_JOB_PARAMS': {
        
                return reduxStore.dispatch( reduxActions.getBatchJobParams(payload) );
            }

            case 'SET_BATCH_JOB_PARAMS': {
        
                return reduxStore.dispatch( reduxActions.setBatchJobParams(payload) );
            }

            case 'GET_BATCH_JOB_EXECUTED_LIST': {
        
                return reduxStore.dispatch( reduxActions.getBatchJobExecutedList(payload) );
            }

            case 'SET_BATCH_JOB_EXECUTED_LIST': {
        
                return reduxStore.dispatch( reduxActions.setBatchJobExecutedList(payload) );
            }

            case 'GET_BATCH_JOB_EXECUTED': {
        
                return reduxStore.dispatch( reduxActions.getBatchJobExecuted(payload) );
            }

            case 'SET_BATCH_JOB_EXECUTED': {
        
                return reduxStore.dispatch( reduxActions.setBatchJobExecuted(payload) );
            }
        }
        
    }
}

// SINGLETON
// Export an instance of the class directly
export default new ReduxService();