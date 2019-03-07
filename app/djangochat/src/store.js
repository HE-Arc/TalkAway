import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from './reducers/AuthReducer';
import channelReducer from './reducers/ChannelReducer';
import serverReducer from './reducers/ServerReducer';

const logger = createLogger({
    // ...options
});

export default createStore(
    combineReducers({
        authReducer,
        serverReducer,
        channelReducer
    }),
    {},
    applyMiddleware(logger, thunk)
);