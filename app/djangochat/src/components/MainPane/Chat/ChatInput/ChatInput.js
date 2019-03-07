import React, {
    Component
} from 'react';
import "./ChatInput.css"

class ChatInputComponent extends Component {

    constructor(props) {
        super(props);
        this.updateArea = this.updateArea.bind(this);
    }

    updateArea() {
        var area = this.refs.textArea;
        area.style.height = 'inherit';
        var scrollbarDisplay = area.clientHeight < area.scrollHeight;
        if (scrollbarDisplay) {
            var height = area.scrollHeight + 8;
            area.style.height = height + "px";
        }
    }

    render() {
        return (
            <div>
                <textarea ref="textArea" id="inputMessage" spellCheck="false" onChange={this.updateArea}></textarea>
            </div>
        );
    }
}

export default ChatInputComponent;