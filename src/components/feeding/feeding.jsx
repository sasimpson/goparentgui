import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import FeedingForm from './feedingform'
import FeedingData from './feedingdata'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    }
}

class Feeding extends React.Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login"/>                
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Feeding</h3>
                        </div>
                    </div>
                    <div className="row">
                        <FeedingForm/>
                    </div>
                    <div className="row">
                        <FeedingData/>
                    </div>
                </div>
            )
        }
    }
}


export default connect(mapStateToProps)(Feeding)
