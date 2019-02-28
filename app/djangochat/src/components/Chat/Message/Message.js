import React, {
    Component
} from 'react';

class MessageComponent extends Component {
    
    constructor(props) {
        super(props);
        this.setState({
            messageObject: props.messageObject
        });
    }

    render() {
        return (
            <div>
                <h3>{this.state.messageObject.user.username} ({this.state.messageObject.date})</h3>
                <p>{this.state.messageObject.text}</p>
            </div>
            );
        }
    }

    export default MessageComponent;