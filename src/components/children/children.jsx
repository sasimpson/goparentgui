import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import ChildrenForm from './childrenform'
import ChildrenData from './childrendata'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    }
}

class Children extends React.Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="login" />
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Children</h3>
                        </div>
                    </div>
                    <div className="row">
                        <ChildrenForm/>
                    </div>
                    <div className="row">
                        <ChildrenData/>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps)(Children)