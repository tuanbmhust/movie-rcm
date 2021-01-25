import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { LoginAccount } from '../reducers/loginAccount';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            loginAccount: LoginAccount,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};