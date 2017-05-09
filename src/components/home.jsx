import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import  LoginForm from './loginform'

const mapStateToProps = (state) => ({ ...state.app });

class Home extends React.Component {
    render() {
        var loggedIn;
        if (this.props.isAuthenticated) {
            loggedIn = null;
        } else {
            loggedIn = <LoginForm/>;
        }
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
                <div className="row">
                    {loggedIn}
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <hr/>
                    </div>
                </div>
            </div>   
        );
    }
}

export default connect(mapStateToProps)(Home);

