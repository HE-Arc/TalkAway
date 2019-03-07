import React, {
    Component
} from 'react';
import "./ChatInput.css"

class ChatInputComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea id="inputMessage" spellCheck="false"></textarea>
            </div>
        );
    }
}

export default ChatInputComponent;