import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import DiaperForm from './diaperform';
import DiaperData from './diaperdata';


const mapStateToProps = (state) => {
    return {
        settings: state.settings,
        authentication: state.authentication,
        children: state.entities.children,
    }
}

class Diaper extends React.Component {

    constructor(props) {
        super(props)
        this.getCurrentChild = this.getCurrentChild.bind(this)
        this.getTitle = this.getTitle.bind(this)
    }

    getCurrentChild = () => {
        if (this.props.settings.currentChild !== "") {
            return this.props.children.byID[this.props.settings.currentChild]
        }
        return null
    }

    getTitle = (currentChild) => {
        if (currentChild !== null) {
            return "Diapers for " + currentChild.name
        }
        return "Please select a child"
    }

    render() {
        if (!this.props.authentication.isAuthenticated) {
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
                            <DiaperForm />
                        </div>
                        <div className="row">
                            <DiaperData />
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

export default connect(mapStateToProps)(Diaper)
