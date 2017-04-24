import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from './home';
import Sleep from './sleep/sleep';
import Diaper from './diaper/diaper';
import Feeding from './feeding/feeding';


class Content extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
        <Router>
            <div>    
                <Route exact path="/" component={Home}/>
                <Route path="/sleep" component={Sleep}/>
                <Route path="/diaper" component={Diaper}/>
                <Route path="/feeding" component={Feeding}/>
            </div>
        </Router>
    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default Content;
