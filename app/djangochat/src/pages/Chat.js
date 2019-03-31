import React from 'react';
import MainPane from '../components/MainPane/MainPane';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import ReduxToastr from 'react-redux-toastr';

import {connect} from 'react-redux';

import {initWebSocket} from '../actions/WebSocketAction';

const ChatPage = props => {
    props.initWebSocket();
    return (
        <div>
            <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick/>
            <MainPane/>
        </div>
        
    );
}

export default connect(null,{initWebSocket})(ChatPage);