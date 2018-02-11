import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    }
}

class Registration extends React.Component {

    render() {
        if (this.props.isAuthenticated) {
            return (
                <div>
                    <Redirect to="/"/>
                </div>
            )
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h3>Register New User</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Registration);