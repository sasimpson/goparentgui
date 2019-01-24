import React from 'react'
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap'
import { bindActionCreators } from 'redux';
import { resetPasswordRequest } from '../../actions/authentication'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetPasswordRequest: resetPasswordRequest
    }, dispatch)
}

class PasswordReset extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            code: ""
        }
        this.handleResetSubmit = this.handleResetSubmit.bind(this)
    }

    componentDidMount = () => {
        console.log(this.props.match.params.code)
        this.setState({code: this.props.match.params.code})
    }

    handleResetSubmit = (event) => {
        event.preventDefault()
        console.log(event)
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
                            <form id="passwordreset-form">
                            <FormGroup>
                                <ControlLabel htmlFor="pass1">Password</ControlLabel>
                                <FormControl type="text"></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel htmlFor="pass2">Confirm Password</ControlLabel>
                                <FormControl type="text"></FormControl>
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Password Reset</h2>
                        <p>If you wish to reset your password, please enter your password below.  You will be sent instructions in an email.</p>
                        <form id="passwordreset-form" onSubmit={this.handleResetSubmit}>
                            <FormGroup>
                                <ControlLabel htmlFor="email">Email</ControlLabel>
                                <FormControl type="text"></FormControl>
                            </FormGroup>
                            <div className="form-group">
                                <Button type="submit" bsStyle="primary" id="submitButton">Submit</Button> <Button type="button" bsStyle="danger" onClick={this.handleClear}>Clear</Button>
                            </div>
                        </form>
                    </div>
                </div>               
            </div>
        );
    }
}

export default PasswordReset
