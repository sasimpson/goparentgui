import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import FeedingForm from './feedingform'
import FeedingData from './feedingdata'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        settings: state.settings,
        children: state.entities.children,
    }
}

class Feeding extends React.Component {
    constructor(props) {
        super(props)
        this.getCurrentChild = this.getCurrentChild.bind(this)
        this.getTitle = this.getTitle.bind(this)
    }

    getCurrentChild = () => {
        if (this.props.settings.currentChild !== null) {
            return this.props.children.byID[this.props.settings.currentChild]
        }
        return null
    }

    getTitle = (currentChild) => {
        if (currentChild !== null) {
            return "Feedings for " + currentChild.name
        }
        return "Please select a child"
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login"/>                
        } else {
            if (this.getCurrentChild() !== null ) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>{this.getTitle(this.getCurrentChild())}</h3>
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
            } else {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Please select a child</h3>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}


export default connect(mapStateToProps)(Feeding)
