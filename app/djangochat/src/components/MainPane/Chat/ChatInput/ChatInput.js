import React, {
    Component
} from 'react';
import "./ChatInput.css"

class ChatInput extends Component {

    constructor(props) {
        super(props);
        this.updateArea = this.updateArea.bind(this);
        this.state = {
            adaptMessagesSpace: props.adaptMessagesSpace
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

    render() {
        return (
            <div>
                <textarea ref="textArea" id="inputMessage" spellCheck="false" onChange={this.updateArea}></textarea>
            </div>
        );
    }
}

export default ChatInput;