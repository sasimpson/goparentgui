import React from 'react';
import {Redirect} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {LOGOUT_USER} from '../actions/index' 
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({...state})

class Logout extends React.Component {
    logoutEvent = (event) => {
        this.props.dispatch({type: LOGOUT_USER})
    }
    componentDidMount = () => {
        this.props.dispatch({type: LOGOUT_USER})
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Button type="submit" bsStyle="danger" onClick={this.logoutEvent}>Logout</Button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default connect(mapStateToProps)(Logout)
