import React, {
    Component
} from 'react';

class MessageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageObject: props.messageObject
        };
    }

    render() {
        return <h2>this.state.messageObject.user.username</h2>
    }
}

export default MessageComponent;