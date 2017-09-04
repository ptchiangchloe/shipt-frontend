import React, { Component } from 'react';
import { Redirect } from 'react-router'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ fireRedirect: true })
    }

    render() {
        const { fireRedirect } = this.state

        return (
            <div className="search-page">
                <h2>Enter a Github Username</h2>
                <form onSubmit={this.handleSubmit}>
                    <input ref="userInput" className="search-page-input" type="text" />
                    <button className="search-page-btn">Search</button>
                </form>
                { fireRedirect && (
                    <Redirect to={`/user/alice`} />
                )}
            </div>
        );
    }
};
