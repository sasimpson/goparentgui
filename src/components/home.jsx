import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Summary from './summary'

const mapStateToProps = (state) => {
    return {
        children: state.entities.children,
        isAuthenticated: state.authentication.isAuthenticated,
        user: state.authentication.user,
        token: state.authentication.auth.token,
    }
};

class Home extends React.Component {
    render() {
        if (this.props.isAuthenticated) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            Welcome {this.props.user.name}, you can do the following actions:
                            <ul className="nav nav-pills nav-stacked nav-justified">
                                <li role="presentation"><Link to="/diaper">Diaper</Link></li>
                                <li role="presentation"><Link to="/feeding">Feeding</Link></li>
                                <li role="presentation"><Link to="/sleep">Sleep</Link></li>
                            </ul>
                        </div>
                    </div>
                    <Summary/>

                </div>  
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default connect(mapStateToProps)(Home);

