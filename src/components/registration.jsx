import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    }
}

class Registration extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            password1: "",
            password2: "",
            email: ""
        }

        this.handleFormChange = this.handleFormChange.bind(this)
        this.getPasswordValidation = this.getPasswordValidation.bind(this)
    }

    handleFormChange = (e) => {
        var change = {}
        change[e.target.id] = e.target.value
        this.setState(change)
    }

    getPasswordValidation = () => {
        console.log(this.state)
        if (this.state.password1.length < 10)
            return 'error'
        if (this.state.password2.length < 10)
            return 'error'
        if (this.state.password1 !== this.state.password2)
            return 'error'

        return 'success'
    }

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
                    <div className="col-md-6">
                    <h3>Register New User</h3>
                    <form action="">
                        <FormGroup controlId="email">
                            <ControlLabel>Email Address:</ControlLabel>
                            <FormControl type="text" placeholder="me@example.com" onChange={this.handleFormChange}/>
                            <HelpBlock>Please enter your email address</HelpBlock>
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