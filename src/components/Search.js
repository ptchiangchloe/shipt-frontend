import React, { Component } from 'react';
import history from '../../history';
import { Button } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class Search extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/user/${this.userInput.value}`)
    }
    render() {
        return (
            <Grid fluid>
                <Row center = "sm">
                    <Col xs = {6} md = {6} lg = {3}>
                        <h2> Enter a Github Username </h2>
                    </Col>
                </Row>
                <Row center = "sm">
                    <form onSubmit = {this.handleSubmit} >
                        <input
                            ref = {(c) => this.userInput = c}
                            className = "search-page-input"
                            type = "text"
                        />
                        <Button label = "Default" >
                            Search
                        </Button>
                    </form>
                </Row>
            </Grid>
        );
    }
};
