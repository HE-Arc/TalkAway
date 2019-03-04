import React, { Component } from 'react';
import LeftPane from './LeftPane/LeftPane';
import MiddlePane from './Chat/MiddlePane';

class MainPane extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            messageList:JSON.stringify("{}")
        };
    }

    render() {
        return(
            <div id="container" className="container">
                <div className="row" style={{width: '100vw'}}>
                    <div className="col-3 bg-dark text-white" style={{height: '100vh', padding: 0}}>
                        <LeftPane/>
                    </div>
                    <div className="col-6" style={{height: '100vh', padding: 0}}>
                        <MiddlePane messageList={this.state.messageList}/>
                    </div>
                    <div className="col-3 bg-dark" style={{height: '100vh', padding: 0}}>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPane;