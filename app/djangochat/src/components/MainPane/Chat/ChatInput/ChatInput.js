import React, {
    Component
} from 'react';
import "./ChatInput.css"

class ChatInput extends Component {

    constructor(props) {
        super(props);
        this.updateArea = this.updateArea.bind(this);
        this.keyEvent = this.keyEvent.bind(this);
        this.state = {
            adaptMessagesSpace: props.adaptMessagesSpace,
            sendMessage: props.sendMessage
        }
    }

    updateArea() {
        const area = this.refs.textArea;
        area.style.height = '0';
        const scrollbarDisplay = area.clientHeight < area.scrollHeight;
        if (scrollbarDisplay) {
            var height = area.scrollHeight + 8;
            area.style.height = height + "px";
        }
        this.state.adaptMessagesSpace();
    }

    keyEvent(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            const message = e.target.value;
            if (message !== "") {
                this.state.sendMessage(message);
            }
            e.target.value = "";
            e.preventDefault();
            this.updateArea();
        }
    }

    render() {
        return (
            <div>
                <textarea ref="textArea" id="inputMessage" spellCheck="false" onKeyDown={this.keyEvent} onChange={this.updateArea}></textarea>
            </div>
        );
    }
}

export default ChatInput;