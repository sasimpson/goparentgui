import React from 'react'
import {FormGroup, FormControl, Button, ControlLabel, HelpBlock} from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { resetPasswordRequest } from '../../actions/authentication'
import { connect } from 'react-redux'
import { flashErrorMessage } from 'redux-flash/lib/actions';


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetPasswordRequest: resetPasswordRequest
    }, dispatch)
}

class ResetPassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            code: "",
            password1: "",
            password2: "",
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
        // this.requestResetPassword(event)
        //do bit to submit to /api/user/resetpassword
    }

    render() {
        if (this.state.code !== undefined) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Reset Password</h2>
                            <form id="passwordreset-form" onSubmit={this.handleResetSubmit}>
                            <FormGroup>
                                <ControlLabel htmlFor="pass1">Password</ControlLabel>
                                <FormControl type="text" onChange={this.updatePass1}></FormControl>
                                <HelpBlock>Enter a password that is longer than 10 characters</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel htmlFor="pass2">Confirm Password</ControlLabel>
                                <FormControl type="text" onChange={this.updatePass2}></FormControl>
                            </FormGroup>
                            <div className="form-group">
                                <Button type="submit" bsStyle="primary" id="submitButton">Submit</Button>
                            </div>
                        </form>
                        </div>
                    </div>               
                </div>
            );    
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
