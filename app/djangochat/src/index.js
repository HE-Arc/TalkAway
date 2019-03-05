import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';

const userReducer = (state = {
    id: null,
    username: null,
    email: null,
    token: null
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                id: action.id
            };
            break;
        case "REFRESH_TOKEN":
            state = {
                ...state,
                token: action.token
            };
            break;
        default:
    }
    return state;
};
const serverReducer = (state = {}, action) => {
    switch (action.type) {
        case
            "ADD":
            state = state + action.value;
            break;
        default:
    }
    return state;
};

const channelReducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_TEST":
            state = state + action.value;
            break;
        case "SUBSTRACT":
            break;
        default:
    }
    return state;
};

const logger = createLogger({
    // ...options
});

const store = createStore(combineReducers({userReducer, serverReducer, channelReducer}), applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
