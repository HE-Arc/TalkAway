import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';

import authReducer from './reducers/AuthReducer';
import channelReducer from './reducers/ChannelReducer';
import serverReducer from './reducers/ServerReducer';
import friendReducer from './reducers/FriendReducer';
import messageReducer from './reducers/MessageReducer';
import contactReducer from './reducers/ContactReducer';
import webSocketReducer from './reducers/WebSocketReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'
// const logger = createLogger({
//     // ...options
// });

let middleware = [ thunk ]
if (process.env.NODE_ENV === 'development') {
  const {createLogger} = require('redux-logger')
  middleware = [ ...middleware, createLogger({}) ]
}

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const store = createStore(
    combineReducers({
        auth: authReducer,
        server: serverReducer,
        channel: channelReducer,
        friend: friendReducer,
        message: messageReducer,
        contact: contactReducer,
        ws:webSocketReducer,
        toastr: toastrReducer
    }),
    persistedState,
    applyMiddleware(...middleware)
);

store.subscribe(throttle(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
},1000));

export default store;