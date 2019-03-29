import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from './reducers/AuthReducer';
import channelReducer from './reducers/ChannelReducer';
import serverReducer from './reducers/ServerReducer';
import friendReducer from './reducers/FriendReducer';
import messageReducer from './reducers/MessageReducer';
import contactReducer from './reducers/ContactReducer';

const logger = createLogger({
    // ...options
});

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const store = createStore(
    combineReducers({
        auth: authReducer,
        server: serverReducer,
        channel: channelReducer,
        friend: friendReducer,
        message: messageReducer,
        contact: contactReducer
    }),
    persistedState,
    applyMiddleware(logger, thunk)
);

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;