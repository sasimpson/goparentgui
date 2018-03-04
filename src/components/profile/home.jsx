import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Invites from './invites'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
    }
}

class Profile extends React.Component {
    render() {
        if (this.props.isAuthenticated) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Your Profile</h3>
                        </div>
                    </div>
                    <Invites/>
                </div>
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default connect(mapStateToProps)(Profile)