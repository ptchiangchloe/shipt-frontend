import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className="main-app">
                <header className="main-header">
                <h1> React Github Account Lookup </h1>
                </header>
                <main className="main-content">
                    {children}
                </main>
            </div>
        );
    }
};

export default App;
