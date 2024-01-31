import React, { Component } from 'react';
import LandingPage from './pages/LandingPage';
import MenuHeader from './MenuHeader';

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
                <MenuHeader />
            </>
        );
    }

}

export default App;
