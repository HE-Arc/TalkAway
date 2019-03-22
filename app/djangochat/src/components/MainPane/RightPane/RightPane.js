import React from 'react';
import './RightPane.css';
import ServerProfile from './ServerProfile/ServerProfile';
import ServerInfos from './ServerInfos/ServerInfos';

const RightPane = props => {
    return (
        <div>
            <div id="serverProfile">
                <ServerProfile/>
            </div>
            <div id="serverInfos" className="bg-secondary">
                <ServerInfos/>
            </div>
        </div>
    );
}

export default RightPane; 
