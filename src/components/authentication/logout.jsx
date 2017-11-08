import React from 'react';
import {Redirect} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {CLEAR_DATA} from '../../actions/index' 
import {connect} from 'react-redux'
import {logoutUser} from '../../actions/authentication'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
    }
}
class Logout extends React.Component {
    logoutEvent = (event) => {
        this.props.dispatch(logoutUser())
        this.props.dispatch({type: CLEAR_DATA})
    }
    componentDidMount = () => {
        this.props.dispatch(logoutUser())
        this.props.dispatch({type: CLEAR_DATA})        
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
