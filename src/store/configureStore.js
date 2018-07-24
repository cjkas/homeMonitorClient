import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import weatherReducer from '../reducers/weatherReducer';
export default function configureStore() {
    return createStore(
        weatherReducer,
        applyMiddleware(thunk, logger)
    );
}