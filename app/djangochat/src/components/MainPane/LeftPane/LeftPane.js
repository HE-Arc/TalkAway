import React from 'react';
import UserSettings from './UserSettings/UserSettings';
import ContactList from './ContactList/ContactList';
import './LeftPane.css';

const LeftPane = props => {
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

export default LeftPane; 
