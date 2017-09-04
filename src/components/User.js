import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class User extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.match.params.username);
        fetch(`https://api.github.com/users/${this.props.match.params.username}`)
        .then(response => response.json())
        .then(
            user => {
                this.setState({
                    user: user
                })
                console.log(this.state.user);
            }
        )
    }

    // This method is used to a mapping function. Eventually this could be factored out
    // to its own component.
    renderStat(stat) {
        return (
            <li key={stat.name} className="user-info_stat">
                <Link to={stat.url}>
                    <p className="user-info_stat-value">{stat.value}</p>
                    <p className="user-info_stat-name">{stat.name}</p>
                </Link>
            </li>
        )
    }
    render() {
        // If the state doesn't have a user key, it means the AJAX didn't complete yet,
        // Simply render a LOADING indicator.
        if(!this.state.user) {
            return (<div className="user-page">LOADING...</div>)
        }
        // If we get to this part of ‘render’, then the user is loaded
        const user = this.state.user;
        console.log(user);
        console.log(user.bio);
        console.log(user.login);

        // Gather up some number about the user, to be used in a map below
        const stats = [
            {
                name: 'Public Repos',
                value: user.public_repos,
                url: `/user/${this.props.match.params.username}/followers`
            },
            {
                name: 'Followers',
                value: user.followers,
                url: `/user/${this.props.match.params.username}/followers`
            },
            {
                name: 'Following',
                value: user.following,
                url: `/user/${this.props.match.params.username}/following`
            }
        ];

        return (
            <div className="user-page">
                This is user info!
                <div className="user-info">
                    <Link className="user-info_text" to={`/user/${user.login}`}>
                        <img className="user-info-avatar" src={user.avatar_url} alt={`${user.login} avatar`} />
                        <h2 className="user-info-title">{user.login}(user.name)</h2>
                        <p className="user-info-bio">{user.bio}</p>
                    </Link>
                </div>
            </div>
        );
    }
};
