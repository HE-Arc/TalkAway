import React, { Component } from 'react';

class LeftPane extends Component {
    
    constructor(props) {
        super(props);
    }
    
    openSettings() {
        // TODO
        alert("You need to implement user settings first");
    }

    render() {
        return (
            <div className="row" style={{height: '100%', textAlign: 'center'}}>
                <div className="col" style={{paddingTop: '20px', paddingRight: '0',}}>
                    <img src={require('./images/profile.png')} width="70" height="70"/>
                </div>
                <div className="col" style={{paddingTop: '35px', paddingLeft: '0', fontSize: '1.5em', color: '#000000'}}>
                    Username
                </div>
                <div className="col" style={{paddingTop: '35px', paddingLeft: '0'}}>
                    <img src={require('./images/settings.png')} width="40" height="40" onClick={this.openSettings}/>
                </div>
            </div>
        );
    }
}

export default LeftPane; 
