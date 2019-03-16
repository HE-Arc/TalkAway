import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from './reducers/AuthReducer';
import channelReducer from './reducers/ChannelReducer';
import serverReducer from './reducers/ServerReducer';
import friendReducer from './reducers/FriendReducer';
import messageReducer from './reducers/MessageReducer';

const logger = createLogger({
    // ...options
});

export default createStore(
    combineReducers({
        auth: authReducer,
        server: serverReducer,
        channel: channelReducer,
        friend: friendReducer,
        message: messageReducer
    }),
    {},
    applyMiddleware(logger, thunk)
);
