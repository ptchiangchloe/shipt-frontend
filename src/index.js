import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Switch,
    Route
} from 'react-router-dom';
import history from '../history';

import App from './components/App';
import Search from './components/Search';
import User from './components/User';
import {MuiThemeProvider} from 'material-ui';

import {grey, amber} from 'material-ui'

// <Router> component has the ablity to pass your own history object via a prop
const Routes = () => (
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path="/" component = {Search} />
                <Route exact path="/search" component = {Search}/>
                <Route path = "/user/:username" component = {User}/>
            </Switch>
        </App>
    </Router>
)

ReactDOM.render(
    <MuiThemeProvider>
        <Routes />
    </MuiThemeProvider>,
    document.getElementById('root')
)
