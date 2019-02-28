import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>TalkAway</h1>
        </div>
        <div className="main-navigation__item">
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/auth">Auth</NavLink></li>
                <li><NavLink to="/chat">Chat</NavLink></li>
            </ul>
        </div>
    </header>
);

export default mainNavigation;