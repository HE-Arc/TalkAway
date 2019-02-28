import React, { Component } from 'react';

import MainNavigation from "../components/Navigation/MainNavigation";

class HomePage extends Component {
    render() {
        return (
            <main>
                <MainNavigation/>
                <h1>The Home page</h1>
            </main>
        );
    }
}

export default HomePage;