import React, {Component} from 'react';
import './RightPane.css';
import ServerProfile from './ServerProfile/ServerProfile';
import ServerInfos from './ServerInfos/ServerInfos';
import ServerSettings from './ServerSettings/ServerSettings';

class RightPane extends Component{
    state = {
        settingsVisible: false
    }

    switchSettings = ()=> {
        this.setState({
            settingsVisible : !this.state.settingsVisible
        })
    }
    
    render(){
        let component;
        if(this.state.settingsVisible){
            component = (<ServerSettings switchSettings={this.switchSettings} />);
        } else {
            component = (<div>
                <div className="serverProfile">
                    <ServerProfile/>
                </div>
                <div className="serverInfos bg-secondary">
                    <ServerInfos switchSettings={this.switchSettings} />
                </div>
            </div>);
        }
        return component;
    }
}

export default RightPane; 
