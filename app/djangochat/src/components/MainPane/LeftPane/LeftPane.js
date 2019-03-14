import React, { Component } from 'react';
import UserSettings from './UserSettings/UserSettings';
import ContactList from './ContactList/ContactList';
import './LeftPane.css';

class LeftPane extends Component {

    render() {
        return (
            <div>
                <div id="settings" className="bg-secondary">
                    <UserSettings/>
                </div>
                <div id="list">
                    <ContactList/>
                </div>
            </div>
        );
    }
}

export default LeftPane; 
