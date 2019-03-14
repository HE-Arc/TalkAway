import React, {Component} from 'react';
import './App.css';

import {connect} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment >
                    <main >
                        <Switch >
                            <Redirect from="/" to='/home' exact/>
                            <Route path="/home" component={HomePage}/>
                            <Route path="/auth" render={() => (
                                this.props.isLogged ? (
                                    <Redirect to="/chat"/>
                                ) : (
                                    <AuthPage/>
                                )
                            )}/>
                            <Route path="/chat" render={() => (
                                !this.props.isLogged ? (
                                    <Redirect to="/auth"/>
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
