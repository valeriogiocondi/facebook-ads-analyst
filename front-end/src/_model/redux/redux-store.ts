// REDUX
import { applyMiddleware, createStore } from 'redux'

// REDUX - REDUCERS
import indexReducers from './reducers'

// REDUX - SAGA
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

type reduxAction = {
  type:     string,
  payload:  any
};

class Store {

  // TODO
  // Create a typed store
  private store: any;

  public constructor() {

    const sagaMiddleware = createSagaMiddleware();
    this.store = createStore(indexReducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
  }

  public getStore = () => {
    
    return this.store;
  }

  public getState = (reducer?: string): any => {
    
    return reducer ? this.store.getState().reducer : this.store.getState(); 
  }

  public subscribe(callback: any): any {
    
    this.store.subscribe(() => callback(this.store.getState()) );
  }

  public dispatch = (action: reduxAction): any => {
    
    this.store.dispatch(action);
  }
}

// SINGLETON
// Export an instance of the class directly
export default new Store();