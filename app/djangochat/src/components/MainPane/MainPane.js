import React, {
    Component
} from 'react';
import LeftPane from './LeftPane/LeftPane';
import MiddlePane from './Chat/MiddlePane';
import RightPane from './RightPane/RightPane';
import './MainPane.css';

class MainPane extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row fullHeight">
                    <div className="col-3 sidepane pane text-white">
                        <LeftPane/>
                    </div>
                    <div className="col-6 pane">
                        <MiddlePane/>
                    </div>
                    <div className="col-3 sidepane pane">
                        <RightPane/>
                    </div>
                </div>
            </div> 
        );
    }
}

export default MainPane;