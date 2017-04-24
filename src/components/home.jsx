import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <ul className="nav nav-pills nav-stacked nav-justified">
                        <li role="presentation"><Link to="/diaper">Diaper</Link></li>
                        <li role="presentation"><Link to="/feeding">Feeding</Link></li>
                        <li role="presentation"><Link to="/sleep">Sleep</Link></li>
                    </ul>
                </div>
            </div>
        </div>   
    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default Home;
