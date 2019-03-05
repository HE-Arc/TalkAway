import React, { Component } from 'react';
import UserSettings from './UserSettings/UserSettings';
import ContactList from './ContactList/ContactList';

class LeftPane extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="bg-secondary" style={{height: '15vh'}}>
                    <UserSettings/>
                </div>
                <div style={{height: '85vh'}}>
                    <ContactList/>
                </div>
            </div>
        );
    }
}

export default LeftPane; 
