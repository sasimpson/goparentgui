import React from 'react'
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap'
import { bindActionCreators } from 'redux';
import { resetPasswordRequest } from '../../actions/authentication'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetPasswordRequest: resetPasswordRequest
    }, dispatch)
}

class PasswordReset extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            submitted: false
        }
        this.handleResetSubmit = this.handleResetSubmit.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
    }

    updateEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handleResetSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        this.props.resetPasswordRequest(this.state.email)
        this.setState({submitted: true})
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.submitted ? <SubmittedResult /> : <RequestForm submit={this.handleResetSubmit} update={this.updateEmail}/>}
                </div>
            </div>
        )
       
    }
}

const RequestForm = (props) => {
    return (
        <div className="col-md-6">
            <h2>Password Reset</h2>
            <p>If you wish to reset your password, please enter your password below.  You will be sent instructions in an email.</p>
            <form id="passwordreset-form" onSubmit={props.submit}>
                <FormGroup>
                    <ControlLabel htmlFor="email">Email</ControlLabel>
                    <FormControl id="email" type="text" onChange={props.update}></FormControl>
                </FormGroup>
                <div className="form-group">
                    <Button type="submit" bsStyle="primary" id="submitButton">Submit</Button>
                </div>
            </form>
        </div>
    )
}

const SubmittedResult = () => {
    return (
        <div className="col-md-6"> 
            <h2>Password Reset</h2>
            <h4>Thank You, please check your email for a reset password link</h4>
        </div>
    )
}

export default connect("", mapDispatchToProps)(PasswordReset)
