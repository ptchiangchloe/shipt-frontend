import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { Card, CardHeader, CardMedia, Button } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            repos: [],
            followers: [],
            followerPage: 1,
            repoPage: 1,
            DisplayAllRepoItems: false,
            DisplayAllFollowers: false
        };
        this.userName = this.props.match.params.username
    }

    componentDidMount() {
        // Use Es6 fetch metho to request Github users' account API and Github users' repository API.
        const userAccountInfoURL = `https://api.github.com/users/${this.userName}`,
              userRepoInfoURL = `https://api.github.com/users/${this.userName}/repos`,
              userFollowerInfoURL = `https://api.github.com/users/${this.userName}/followers`;

        const apiRequestForGitgubUserAccount = fetch(userAccountInfoURL)
        .then( response => {
            if(response.ok) {
                console.log(response);
                return response.json();
            }
        });

        const apiRequestForGithubUserRepo = fetch(userRepoInfoURL, {
            method: 'GET',
            Authorization: 'a13ee710703772b217a8de853cc5ca32ab38111d',
        })
        .then( response => {
            if(response.ok) {
                console.log(response);
                return response.json();
            }
        });

        const apiRequestForGithubUserFollower = fetch(userFollowerInfoURL, {
            method: 'GET',
            Authorization: 'a13ee710703772b217a8de853cc5ca32ab38111d',
        })
        .then( response => {
            if(response.ok) {
                console.log(response);
                return response.json();
            }
        });

        let combinedData = {
            "GithubUserAccountInfo":{},
            "GithubUserRepoInfo": {},
            "GithubUserFollowerInfo": {}
        };

        Promise.all([
            apiRequestForGitgubUserAccount,
            apiRequestForGithubUserRepo,
            apiRequestForGithubUserFollower
        ])
        .then(
            values => {
                combinedData["GithubUserAccountInfo"] = values[0];
                combinedData["GitbubUserRepoInfo"] = values[1];
                combinedData["GitbubUserFollowerInfo"] = values[2];
                return combinedData;
            }
        ).then(
            combinedData => {
                const userAccountInfo = combinedData["GithubUserAccountInfo"],
                      userRepoInfo = combinedData["GitbubUserRepoInfo"],
                      userFollowersInfo = combinedData["GitbubUserFollowerInfo"];

                if(userAccountInfo === undefined){
                    alert('Your input is not a valid username, please Re-enter a Github username.'),
                    history.push(`/search`)
                } else {
                    console.log(`userAccountInfo is ${userAccountInfo}`);
                    this.setState({
                        user: userAccountInfo,
                        repos: userRepoInfo,
                        followers: userFollowersInfo
                    })
                }
                console.log(this.state.followers);
            }
        )
    }

    _loadMoreRepoItems = (e) => {
        const thePageRequesting = this.state.repoPage + 1,
              thePageRequestingURL = `https://api.github.com/users/${this.userName}
                  /repos?page=${thePageRequesting}&per_page=30`;
        console.log(thePageRequesting);

        fetch(thePageRequestingURL)
        .then( response => {
            if(response.ok) {
                console.log('response 2 addition ok');
                return response.json();
            }
        })
        .then( jsonData => {
            console.log(jsonData.length);

            const currentRepo = this.state.repos.concat(jsonData)
            console.log(currentRepo);

            if (jsonData.length < 30) {
                this.setState({
                    repos: currentRepo,
                    repoPage: thePageRequesting,
                    DisplayAllRepoItems: true
                })
            } else {
                console.log(thePageRequesting);
                this.setState({
                    repos: currentRepo,
                    repoPage: thePageRequesting
                })
                console.log(this.state.repoPage);
            }
        })
    }

    _loadMoreFollowers = (e) => {
        const thePageRequesting = this.state.followerPage + 1,
              thePageRequestingURL = `https://api.github.com/users/${this.props.match.params.username}
                  /followers?page=${thePageRequesting}&per_page=30`;

        fetch(thePageRequestingURL)
        .then( response => {
            if(response.ok) {
                console.log('response 3 addition ok');
                return response.json();
            }
        })
        .then( jsonData => {
            console.log(jsonData.length);

            const currentFollower = this.state.followers.concat(jsonData)
            console.log(currentFollower);

            if (jsonData.length < 30) {
                this.setState({
                    followers: currentFollower,
                    followerPage: thePageRequesting,
                    DisplayAllFollowers: true
                })
            } else {
                this.setState({
                    followers: currentFollower,
                    followerPage: thePageRequesting
                })
            }
        })
    }

    _renderRepoList = (item) => {
        return (
            <div key={item.id} className="repository-item">
                <Row center="xs">
                    <Col lg={10}>
                        <Row center="xs" around="xs">
                            {item.name}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

    _renderFollowerList = (follower) => {
        return (
            <div key={follower.id}>
                <Row start="xs">
                    <Col xsOffset={1} xs={3}>
                        <img
                            src={follower.avatar_url}
                            alt={`${follower.login} avatar`}
                            className='follower-avatar-img'
                            />
                    </Col>
                    <Col xs={8}>
                        <h3>{follower.login}</h3>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        // If the state doesn't have a user key, it means the AJAX didn't complete yet,
        // Simply render a LOADING indicator.
        if(!this.state.user) {
            return (<h1 className="text-center">LOADING...</h1 >)
        }
        // If we get to this part of ‘render’, then the user is loaded
        const {
            user,
            repos,
            followers,
            DisplayAllRepoItems,
            DisplayAllFollowers
        } = this.state;
        console.log(user);
        console.log(user.bio);
        console.log(user.avatar_url);
        if (user.location === null){
            user.location = `Location info is not provided by ${user.login}`;
        }
        return (
            <Grid fluid>
                <Row center="xs">
                    <Col xs = {12} md = {12} lg = {3} className="card-container">
                        <Card>
                            <Row center="xs">
                            <h1>{user.login}</h1>
                            </Row>
                            <p>Location: {user.location}</p>
                            <Row center="xs">
                            <Col xs={10} md={12} lg={10}>{user.bio}</Col>
                            </Row>
                            <Row center="xs">
                                <CardHeader
                                  avatar={
                                      <img src={user.avatar_url} alt={`${user.login} avatar`} className='avatar-img'/>
                                  }
                                 />
                            </Row>
                        </Card>
                    </Col>
                    <Col xs = {12} md = {6} lg = {3} className="card-container">
                        <Card>
                            <Row center="xs">
                            <h1>Followers</h1>
                            {
                                !this.state.DisplayAllFollowers?
                                <p className="count-number">{user.followers}</p> :
                                <p className="count-number red">{user.followers}</p>
                            }
                            </Row>
                            {followers.map(follower => this._renderFollowerList(follower))}
                            {
                                !DisplayAllFollowers &&
                                (<div>
                                   <Button onClick={this._loadMoreFollowers}>
                                       Load More
                                   </Button>
                                </div>)
                            }
                        </Card>
                    </Col>
                    <Col xs = {12} md = {6} lg = {3} className="card-container">
                        <Card className="info-card">
                            <Row center="xs">
                            <h1>Repository</h1>
                            {
                                !this.state.DisplayAllRepoItems?
                                <p className="count-number">{user.public_repos}</p> :
                                <p className="count-number red">{user.public_repos}</p>
                            }
                            </Row>
                            {repos.map(item => this._renderRepoList(item))}
                            {
                                !DisplayAllRepoItems &&
                                (<div className="dt-more-container">
                                   <Button onClick={this._loadMoreRepoItems}>Load More</Button>
                                </div>)
                            }
                        </Card>
                    </Col>
                </Row>
            </Grid>
        );
    }
};
