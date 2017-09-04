import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './components/App';
import Search from './components/Search';
import User from './components/User';

const Routes = () => (
  <Router>
      <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/search" component={Search}/>
          <Route path="/user/:username" component={User}/>
      </Switch>
  </Router>
)

ReactDOM.render(<Routes />, document.getElementById('root'))
