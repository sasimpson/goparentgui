import React from 'react'
import {FormGroup, FormControl, Button, ControlLabel, HelpBlock} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { resetPassword } from '../../actions/authentication'
import { connect } from 'react-redux'
import { flashErrorMessage, flashSuccessMessage } from 'redux-flash/lib/actions';


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetPassword: resetPassword
    }, dispatch)
}

class ResetPassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            code: "",
            password1: "",
            password2: "",
            success: false
        }
        this.handleResetSubmit = this.handleResetSubmit.bind(this)
        this.updatePass1 = this.updatePass1.bind(this)
        this.updatePass2 = this.updatePass2.bind(this)
    }

    componentDidMount = () => {
        console.log(this.props.match.params.code)
        this.setState({code: this.props.match.params.code})
    }

    updatePass1 = (e) => {
        this.setState({password1: e.target.value})
        console.log(e.target.value)
    }

    updatePass2 = (e) => {
        this.setState({password2: e.target.value})
        console.log(e.target.value)
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
    handleResetSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        var result = this.getPasswordValidation()
        if (result !== "success") {
            flashErrorMessage("there is an issue with your password")
        }
        flashSuccessMessage("Your password has been reset, please login")
        this.props.resetPassword(this.state.code, this.state.password1)
        //do bit to submit to /api/user/resetpassword
        this.setState({success: true})
    }

    render() {
        if (this.state.code !== undefined) {
            if (this.state.success === true) {
                return (
                    <Redirect to="/login"/>
                ) 
            } else {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Reset Password</h2>
                                <form id="passwordreset-form" onSubmit={this.handleResetSubmit}>
                                <FormGroup validationState={this.getPasswordValidation()}>
                                    <ControlLabel htmlFor="pass1">Password</ControlLabel>
                                    <FormControl id="pass1" type="password" onChange={this.updatePass1}></FormControl>
                                    <HelpBlock>Enter a password that is longer than 10 characters</HelpBlock>
                                </FormGroup>
                                <FormGroup validationState={this.getPasswordValidation()}>
                                    <ControlLabel htmlFor="pass2">Confirm Password</ControlLabel>
                                    <FormControl id="pass2" type="password" onChange={this.updatePass2}></FormControl>
                                </FormGroup>
                                <div className="form-group">
                                    <Button type="submit" bsStyle="primary" id="submitButton">Submit</Button>
                                </div>
                            </form>
                            </div>
                        </div>               
                    </div>
                );    
            }
        } else {
        //throw error
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            please check your email for a link to reset your password.  you must use that link to proceed.
                        </div>
                    </div>               
                </div>
            );
        }
    }
}

export default connect("", mapDispatchToProps)(ResetPassword)
