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
        let component;
        if(this.state.settingsVisible){
            component =
                <div>
                    <div id="settings" className="bg-secondary">
                        <UserHeader switchSettings={this.switchSettings} />
                    </div>
                    <div id="list">
                        <ContactList />
                    </div>
                </div>;
        } else {
            component = <UserSettings switchSettings={this.switchSettings}/>
        }

        return (
            <div>
                {component}
            </div>
        );
    }
}

export default LeftPane; 
