import React, {Component} from 'react';
import './App.css';

import {connect} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import AuthPage from './pages/Auth';
import ChatPage from './pages/Chat';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

class App extends Component {


    render() {
        return (
            <BrowserRouter>
                <React.Fragment >
                    <main >
                        <Switch >
                            <Redirect from="/" to='/home' exact/>
                            <Route path="/home" render={() => (
                                this.props.isLogged ? (
                                    <Redirect to="/chat"/>
                                ) : (
                                    <AuthPage/>
                                )
                            )}/>
                            <Route path="/chat" render={() => (
                                !this.props.isLogged ? (
                                    <Redirect to="/home"/>
                                ) : (
                                    <ChatPage/>
                                )
                            )}/>
                            <Route path="/chat" component={ChatPage}/>
                        </Switch>
                    </main>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default connect(mapsStateToProps)(App);
