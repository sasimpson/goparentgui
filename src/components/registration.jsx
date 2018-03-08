import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'

import {submitRegistration} from '../actions/registration'


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
    }
}

class Registration extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            password1: "",
            password2: "",
            email: "",
            name: "",
            redirectRegistration: this.props.isAuthenticated
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
        try {
            e.preventDefault()
            this.props.dispatch(submitRegistration(this.state))
            // this.setState({redirectRegistration: true})
        } catch (error) {
            // flashErrorMessage("there was an error with your registration")
            console.log("login error", error)
        }
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
        if (this.props.isAuthenticated || this.state.redirectRegistration) {
            return (
                <div>
                    <Redirect to="/"/>
                </div>
            )
        }
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
                        <FormGroup validationState={this.getPasswordValidation()}>
                            <ControlLabel>Password:</ControlLabel>
                            <FormControl type="password" id="password1" onChange={this.handleFormChange}/>
                            <FormControl type="password" id="password2" onChange={this.handleFormChange}/>
                            <HelpBlock>Enter a password that is longer than 10 characters</HelpBlock>
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Registration);