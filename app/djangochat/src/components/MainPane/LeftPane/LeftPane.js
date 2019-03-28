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

    closeSettings = () => {
        this.setState({
            settingsVisible: false
        })
    }

    render() {
        const displayComponent = this.state.settingsVisible ? <UserSettings  closeSettings={this.closeSettings}/> : <ContactList />;
        return (
            <div>
                <div id="settings" className="bg-secondary">
                    <UserHeader switchSettings={this.switchSettings} />
                </div>
                <div id="list">
                    {displayComponent}
                </div>
            </div>
        );
    }
}

export default LeftPane; 
