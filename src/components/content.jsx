import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from './home'
import Sleep from './sleep/sleep'
import Diaper from './diaper/diaper'
import Feeding from './feeding/feeding'
import Logout from './logout'
import LoginForm from './loginform'


class Content extends React.Component {
  render() {
    return (
        <Router>
            <div>    
                <Route exact path="/" component={Home}/>
                <Route path="/sleep" component={Sleep}/>
                <Route path="/diaper" component={Diaper}/>
                <Route path="/feeding" component={Feeding}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/login" component={LoginForm}/>
            </div>
        </Router>
    );
  }
}

export default Content;

