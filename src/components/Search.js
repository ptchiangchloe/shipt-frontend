import { Component } from 'react';
import { browserHistory as history } from 'react-router';

class Search extends Component {
    constructor(props) {
        super(props);

        handleSubmit = this._handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        history.push(`/user/${this.refs.userInput.value}`)
    }

    render() {
        return (
            <div className="search-page">
                <h2>Enter a Github Username</h2>
                <form onSubmit={handleSubmit}>
                    <input ref="userInput" className="search-page-input" type="text" />
                    <button className="search-page-btn">Search</button>
                </form>
            </div>
        );
    }
};

export default Search;
