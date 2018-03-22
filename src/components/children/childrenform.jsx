import React from 'react';
import { connect }from 'react-redux'
import { bindActionCreators } from "redux"

import Datetime from 'react-datetime'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import { postChild } from '../../actions/children'

const mapStateToProps = (state) => ({
    token: state.authentication.auth.token,
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        postChild: postChild,
    }, dispatch)
}

class ChildrenForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            name: "",
            birthday: new Date()
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleNameChange = (event) => {
        return this.setState({name: event.target.value})
    }
    
    handleDateChange = (newDate) => {
        newDate = new Date(newDate)
        return this.setState({birthday: newDate})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.postChild(this.props.token, this.state)
        this.setState({name: "", birthday: new Date()})
    }

    handleClear = (event) => {
        this.setState({name: "", birthday: new Date()})
    }

    render() {
        return (
            <div className="col-md-6">
                <form onSubmit={this.handleSubmit} id="childForm">
                    <FormGroup>
                        <ControlLabel htmlFor="name">Name</ControlLabel>
                        <FormControl type="text" id="name" onChange={this.handleNameChange} value={this.state.name}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel htmlFor="birthday">Date/Time</ControlLabel>
                        <Datetime onChange={this.handleDateChange} id="birthday"/>
                    </FormGroup>
                    <div className="form-group">
                        <Button type="submit" bsStyle="primary" id="submitButton">Submit</Button> <Button type="button" bsStyle="danger" onClick={this.handleClear}>Clear</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenForm)