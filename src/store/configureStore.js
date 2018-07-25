import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import weatherReducer from '../reducers/weatherReducer';

export const sagaMiddleware = createSagaMiddleware();
// dev tools middleware
const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export function configureStore() {
    return createStore(
        weatherReducer,
        reduxDevTools,
        applyMiddleware(sagaMiddleware, logger)
    );
};