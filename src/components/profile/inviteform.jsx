import React from 'react'
import { connect } from 'react-redux'
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
    }
}

class InviteForm extends React.Component {
    render() {
        return (
            <div className="col-md-6">
                <h4>Invite a new user</h4>
                <form >
                    <FormGroup>
                        <ControlLabel>Email:</ControlLabel>
                        <FormControl type="text" placeholder="other.parent@example.com"/>
                        <HelpBlock>Enter the email of the other person you would like to invite to access and edit your data</HelpBlock>
                    </FormGroup>
                    <Button type="submit">Invite!</Button>
                </form>
            </div>
        )
    }
}

export default InviteForm