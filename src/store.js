import testApp from './reducers/testApp'
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas/RootSaga'

export default function getStore() {
    const sagaMiddleware = createSagaMiddleware()
    const loggerMiddleware = createLogger();
    const middlewares = [sagaMiddleware/*, loggerMiddleware*/];
    const store = createStore(testApp, applyMiddleware(...middlewares))
    sagaMiddleware.run(rootSaga);
    return store;
}