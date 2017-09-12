import '../index.scss';
import React from 'react';

export default class App extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className="main-app">
                <h1 className="text-center"> React Github Account Lookup </h1>
                <main className="main-content">
                    {children}
                </main>
            </div>
        );
    }
}
