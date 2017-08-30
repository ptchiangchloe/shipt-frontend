import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    const { children } = this.prop
    render() {
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
