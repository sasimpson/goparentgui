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
        this.handleResetSubmit = this.handleResetSubmit.bind(this)
    }

    handleResetSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        // this.requestResetPassword(event)
        //do bit to submit to /api/user/resetpassword
    }

    render() {
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
