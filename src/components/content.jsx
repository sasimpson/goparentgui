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
import Profile from './profile/home'
import FlashMessage from './flash'
import PasswordReset from './authentication/passwordreset'
import ResetPassword from './authentication/resetpassword'
import Debug from './debug'

class Content extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <FlashMessage/>
              </div>
            </div>
          </div>
          <Route exact path="/" component={Home}/>
          <Route path="/sleep" component={Sleep}/>
          <Route path="/diaper" component={Diaper}/>
          <Route path="/feeding" component={Feeding}/>
          <Route path="/children" component={Children}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/login" component={LoginForm}/>
          <Route path="/reset" component={ResetStates}/>
          <Route path="/register" component={Registration}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/passwordreset" component={PasswordReset} />
          <Route path="/resetpassword/:code" component={ResetPassword} />
          <Debug/>
        </div>
      </Router>
    );
  }
}

export default Content;
