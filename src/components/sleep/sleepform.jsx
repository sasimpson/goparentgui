import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import Datetime from 'react-datetime'
import { Button } from 'react-bootstrap'

import {postSleep} from '../../actions/sleep'

const mapStateToProps = (state) => ({
    token: state.authentication.auth.token
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        postSleep: postSleep,
    }, dispatch)
}

class SleepForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        }
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleStartChange = (newDate) => {
        newDate = new Date(parseInt(newDate, 10))
        return this.setState({startDate: newDate})
    }

    handleEndChange = (newDate) => {
        newDate = new Date(parseInt(newDate, 10))
        return this.setState({endDate: newDate})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postSleep(this.props.token, this.state)
    }

    render() {
        return (
            <div className="col-md-6">
                <h4>Enter a time:</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <Datetime onChange={this.handleStartChange} id="start" name="start"/>
                    </div>
                    <div className="form-group">
                        <Datetime onChange={this.handleEndChange} id="end" name="end" />
                    </div>
                    <Button type="submit" bsStyle="primary">Submit</Button>
                </form>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SleepForm);
