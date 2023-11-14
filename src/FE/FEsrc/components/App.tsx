import React, { Component } from 'react';
import PatientForm from './PatientForm';

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
            <div>
                <h1>{this.props.message}</h1>
                <PatientForm />
            </div>
        );
    }

}

export default App;
