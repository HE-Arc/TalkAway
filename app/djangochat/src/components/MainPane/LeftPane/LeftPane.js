import React, { Component } from 'react';
import UserSettings from './UserSettings/UserSettings';

class LeftPane extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bg-secondary" style={{height: '15vh'}}>
                <UserSettings/>
            </div>
        );
    }
}

export default LeftPane; 
