import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './home'
import Sleep from './sleep/sleep'
import Diaper from './diaper/diaper'
import Feeding from './feeding/feeding'
import Children from './children/children'
import Logout from './authentication/logout'
import LoginForm from './authentication/loginform'
import ResetStates from './reset'
import Registration from './registration'

class Content extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/sleep" component={Sleep}/>
          <Route path="/diaper" component={Diaper}/>
          <Route path="/feeding" component={Feeding}/>
          <Route path="/children" component={Children}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/login" component={LoginForm}/>
          <Route path="/reset" component={ResetStates}/>
          <Route path="/register" component={Registration}/>
        </div>
      </Router>
    );
  }
}

export default Content;
