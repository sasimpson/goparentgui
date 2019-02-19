import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'

import {submitRegistration} from '../actions/registration'
import { bindActionCreators } from 'redux';


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        registrationInProgress: state.authentication.isRegistering,
        registrationError: state.authentication.registrationError,
        isRegistered: state.authentication.isRegistered
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        submitRegistration: submitRegistration
    }, dispatch)
}

class Registration extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            password1: "",
            password2: "",
            email: "",
            name: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.getPasswordValidation = this.getPasswordValidation.bind(this)
    }

    handleFormChange = (e) => {
        var change = {}
        change[e.target.id] = e.target.value
        this.setState(change)
    }

    handleSubmit = (e) => {
        //prevent form default
        e.preventDefault()
        //dispatch the registration 
        this.props.submitRegistration(this.state)
    }

    getPasswordValidation = () => {
        if (this.state.password1.length < 10)
            return 'error'
        if (this.state.password2.length < 10)
            return 'error'
        if (this.state.password1 !== this.state.password2)
            return 'error'
        return 'success'
    }

    render() {
        //state of the form is based on if the user is already authenticted, then send them home. if not, 
        // then check the state tree components to see if all the successful conditions have been met.
        if (this.props.isAuthenticated || (this.props.isRegistered && !this.props.isRegistering && !this.props.registrationError ) ) {
            return (
                <div>
                    <Redirect to="/"/>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        <h3>Register New User</h3>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="name">
                            <ControlLabel>Name:</ControlLabel>
                            <FormControl type="text" placeholder="Jane Doe" onChange={this.handleFormChange} />
                            <HelpBlock>Enter your full name</HelpBlock>
                            <FormGroup controlId="email">
                                <ControlLabel>Email Address:</ControlLabel>
                                <FormControl type="text" placeholder="me@example.com" onChange={this.handleFormChange}/>
                                <HelpBlock>Enter your email address</HelpBlock>
                            </FormGroup>
                            </FormGroup>
                            <FormGroup validationState={this.getPasswordValidation()} id="passGroup">
                                <ControlLabel>Password:</ControlLabel>
                                <FormControl type="password" id="password1" onChange={this.handleFormChange}/>
                                <FormControl type="password" id="password2" onChange={this.handleFormChange}/>
                                <HelpBlock>Enter a password that is longer than 10 characters</HelpBlock>
                            </FormGroup>
                            <Button type="submit" id="submitButton">Submit</Button>
                        </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);