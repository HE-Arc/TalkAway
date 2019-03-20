import React, {Component} from 'react';
import {connect} from 'react-redux';
import LeftPane from './LeftPane/LeftPane';
import MiddlePane from './Chat/MiddlePane';
import RightPane from './RightPane/RightPane';
import './MainPane.css';

class MainPane extends Component {
    render() {
        if (this.props.serversDisplayed) {
            return (
                <div className="container-fluid">
                    <div className="row fullHeight">
                        <div className="col-2 sidepane pane text-white">
                            <LeftPane/>
                        </div>
                        <div className="col-8 pane">
                            <MiddlePane/>
                        </div>
                        <div className="col-2 sidepane pane">
                            <RightPane/>
                        </div>
                    </div>
                </div> 
            );
        } else {
            return (
                <div className="container-fluid">
                    <div className="row fullHeight">
                        <div className="col-2 sidepane pane text-white">
                            <LeftPane/>
                        </div>
                        <div className="col-10 pane">
                            <MiddlePane/>
                        </div>
                    </div>
                </div> 
            );
        }
    }
}

const mapsStateToProps = (state) => {
    return {
        serversDisplayed: state.contact.serversDisplayed
    }
}

export default connect(mapsStateToProps)(MainPane);