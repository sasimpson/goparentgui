import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'

import {postInvite} from '../../actions/profile'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        postInvite: postInvite
    }, dispatch)
}

class InviteForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = e => {
        return this.setState({email: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.postInvite(this.props.token, this.state.email)
    }

    render() {
        return (
            <div className="col-md-6">
                <h4>Invite a new user</h4>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel>Email:</ControlLabel>
                        <FormControl type="text" placeholder="other.parent@example.com" onChange={this.handleChange}/>
                        <HelpBlock>Enter the email of the other person you would like to invite to access and edit your data</HelpBlock>
                    </FormGroup>
                    <Button type="submit">Invite!</Button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteForm)