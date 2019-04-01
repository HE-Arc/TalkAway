import React, { Component } from 'react';
import UserHeader from './UserHeader/UserHeader';
import UserSettings from './UserSettings/UserSettings';
import ContactList from './ContactList/ContactList';
import './LeftPane.css';

class LeftPane extends Component {
    state = {
        settingsVisible: false
    }
    
    switchSettings = () => {
        this.setState({
            settingsVisible: !this.state.settingsVisible
        })
    }

    render() {
        return (
            <div>
                <div className={!this.state.settingsVisible?"d-none":""} >
                    <UserSettings switchSettings={this.switchSettings}/>
                </div>
                <div className={this.state.settingsVisible?"d-none":""}>
                    <div className="settings bg-secondary">
                        <UserHeader switchSettings={this.switchSettings} />
                    </div>
                    <div className="list">
                        <ContactList />
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftPane;
