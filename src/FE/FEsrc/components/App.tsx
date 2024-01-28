import React, { Component } from 'react';
import LandingPage from './LandingPage';

interface AppProps {
    message: string;
}

interface AppState {
    rendered: boolean;
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            rendered: false
        }
    }

    render() {
        return (
            <>
                {/* <h1>{this.props.message}</h1> */}
                <LandingPage />
            </>
        );
    }

}

export default App;
