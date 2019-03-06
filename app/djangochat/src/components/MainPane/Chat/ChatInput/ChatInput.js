import React, {
    Component
} from 'react';

class ChatInputComponent extends Component {

    render() {
        return (
            <div>
                <input id="inputMessage" type="text"/><button id="sendMessage">Send</button>
            </div>
        );
    }
}

export default ChatInputComponent;