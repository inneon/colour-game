import testApp from './reducers/testApp'
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { watchRotation } from './sagas/HSLtoRGBSaga'

export default function getStore() {
    const sagaMiddleware = createSagaMiddleware()
    const loggerMiddleware = createLogger();
    const middlewares = [sagaMiddleware, loggerMiddleware];
    const store = createStore(testApp, applyMiddleware(...middlewares))
    sagaMiddleware.run(watchRotation);
    return store;
}