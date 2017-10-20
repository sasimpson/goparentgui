import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const mapStateToProps = (state) => ({ ...state });

class Home extends React.Component {
    
    render() {
        console.log("isauthenticated?: ",this.props.authentication.isAuthenticated)
        if (this.props.authentication.isAuthenticated) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            Welcome {this.props.authentication.user.name}, you can do the following actions:
                            <ul className="nav nav-pills nav-stacked nav-justified">
                                <li role="presentation"><Link to="/diaper">Diaper</Link></li>
                                <li role="presentation"><Link to="/feeding">Feeding</Link></li>
                                <li role="presentation"><Link to="/sleep">Sleep</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>   
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default connect(mapStateToProps)(Home);

