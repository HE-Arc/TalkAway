import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';

// import { createStore } from 'redux';

// const userReducer = (state = {
//   id: null,
//   username: null,
//   email: null,
//   token: null
// }, action) => {
//   switch(action.type){
//     case "ADD":
//       state = {
//         ...state,
//         id : action.id
//       };
//       break;
//     case "REFRESH_TOKEN":
//       state = {
//         ...state,
//         token: action.token
//       };
//   }
//   return state;
// };

// const serverReducer = (state, action) => {
//   switch(action.type){
//     case "ADD":
//       state = state + action.value;
//       break;
//   }
//   return state;
// };

// const channelReducer = (state, action) => {
//   switch(action.type){
//     case "ADD":
//       state = state + action.value;
//       break;

//     case "SUBSTRACT":
//       break;
//   }
//   return state;
// };

// const store = createStore(,1);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <main>
            <Switch>
              <Redirect from="/" to='/home' exact />
              <Route path="/home" component={HomePage}/>
              <Route path="/auth" component={AuthPage}/>
              <Route path="/chat" component={ChatPage}/>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
