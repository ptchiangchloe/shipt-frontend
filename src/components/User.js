import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { Card, CardHeader, CardMedia, Button } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class User extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            repos: '',
            lists: [],
            follower: '',
            followerLists: [],
            DisplayAllRepoItems: false,
            DisplayAllFollowers: false
        };
    }

    componentDidMount() {
        // Use Es6 fetch metho to request Github users' account API and Github users' repository API.
        let apiRequestForGitgubUserAccountInfo = fetch(`https://api.github.com/users/${this.props.match.params.username}`)
        .then( response => {
            if(response.ok) {
                console.log('response 1 ok');
                return response.json();
            }
        });

        let apiRequestForGithubUserRepoInfo = fetch(`https://api.github.com/users/${this.props.match.params.username}/repos`)
        .then( response => {
            if(response.ok) {
                console.log('response 2 ok');

                return response.json();
            }
        });

        let apiRequestForGithubUserFollowersInfo = fetch(`https://api.github.com/users/${this.props.match.params.username}/followers`)
        .then( response => {
            if(response.ok) {
                console.log('response 3 ok');
                return response.json();
            }
        });

        let combinedData = {
            "GithubUserAccountInfo":{},
            "GithubUserRepoInfo": {},
            "GithubUserFollowersInfo": {}
        };

        Promise.all([
            apiRequestForGitgubUserAccountInfo,
            apiRequestForGithubUserRepoInfo,
            apiRequestForGithubUserFollowersInfo
        ], {
          'Authorization': 'a8cf0cb26a4371090de0758e7c42cce41e254aad',
        })
        .then(
            values => {
                combinedData["GithubUserAccountInfo"] = values[0];
                combinedData["GitbubUserRepoInfo"] = values[1];
                combinedData["GitbubUserFollowersInfo"] = values[2];

                return combinedData;
            }
        ).then(
            combinedData => {
                const userAccountInfo = combinedData["GithubUserAccountInfo"],
                      userRepoInfo = combinedData["GitbubUserRepoInfo"],
                      userFollowersInfo = combinedData["GitbubUserFollowersInfo"];

                if(userAccountInfo === undefined){
                    alert('Your input is not a valid username, please Re-enter a Github username.'),
                    history.push(`/search`)
                } else {
                    console.log(`userAccountInfo is ${userAccountInfo}`);
                    this.setState({
                        user: userAccountInfo,
                        repos: userRepoInfo,
                        follower: userFollowersInfo
                    })
                }
                this.setState({
                    lists: this.state.repos.slice(0,10),
                    followerLists: this.state.follower.slice(0, 10)
                })
                console.log(this.state.lists);
                console.log(this.state.followerLists);

            }
        )
    }

    handleClick = (e) => {
        let lengthOfCurrentList = this.state.lists.length;
        let lengthOfListAfterAddMore = lengthOfCurrentList + 10;

        this.setState({
            lists: this.state.repos.slice(0, lengthOfListAfterAddMore)
        })

        if(this.state.lists.length === this.state.repos.length) {
            this.setState({
                DisplayAllRepoItems: true
            })
        }
    }

    handleClickForFollowerCard = (e) => {
        let lengthOfCurrentFollowerList = this.state.followerLists.length;
        let lengthOfFollowerListAfterAddMore = lengthOfCurrentFollowerList + 10;

        this.setState({
            followerLists: this.state.follower.slice(0, lengthOfFollowerListAfterAddMore)
        })

        if(this.state.followerLists.length === this.state.follower.length) {
            this.setState({
                DisplayAllFollowers: true
            })
        }
    }

    renderList(item) {
        return (
            <div key={item.id}>
                <Row center="xs">
                    <Col lg={10}>
                        <p>{item.full_name}</p>
                    </Col>
                </Row>
            </div>
        )
    }

    renderFollowerList(follower) {
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
            lists,
            followerLists,
            DisplayAllRepoItems,
            DisplayAllFollowersItems
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
                            <div>{user.bio}</div>
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
                            <p className="count-number">{user.followers}</p>
                            </Row>
                            {followerLists.map(follower => this.renderFollowerList(follower))}
                            {
                                !DisplayAllFollowersItems &&
                                (<div className="dt-more-container">
                                   <Button onClick={this.handleClickForFollowerCard}>
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
                            <p className="count-number">{user.public_repos}</p>
                            </Row>
                            {lists.map(this.renderList)}
                            {
                                !DisplayAllRepoItems &&
                                (<div className="dt-more-container">
                                   <Button onClick={this.handleClick}>Load More</Button>
                                </div>)
                            }
                        </Card>
                    </Col>
                </Row>
            </Grid>
        );
    }
};
