import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from 'react-bootstrap'
import MdDelete from 'react-icons/lib/md/delete'
import MdAdd from 'react-icons/lib/md/add'

import {getInvites, deleteInvite, acceptInvite} from '../../actions/profile'

var mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        sent: state.entities.invites.sent,
        pending: state.entities.invites.pending
    }
}

var mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getInvites: getInvites,
        deleteInvite: deleteInvite,
        acceptInvite: acceptInvite
    }, dispatch)
}

const InviteList = (props) => {
    return (
        <table id={props.name + "Table"} className="table table-condensed table-striped">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Sent</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.rows}
            </tbody>
        </table>
    )
}

class InviteRow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.data.id,
            email: this.props.data.inviteEmail,
            timestamp: this.props.data.timestamp,
        }
    }

    deleteMe = () => {
        this.props.deleteInvite(this.props.token, this.state.id)
    }

    acceptMe = () => {
        this.props.acceptInvite(this.props.token, this.state.id)
    }

    render() {
        var button
        if (this.props.deleteInvite) {
            button = <Button bsStyle="danger" bsSize="xsmall" onClick={this.deleteMe}><MdDelete /></Button>
        } else {
            button = <Button bsStyle="primary" bsSize="xsmall" onClick={this.acceptMe}><MdAdd /></Button>
        }
        return (
            <tr>
                <td>{this.state.email}</td>
                <td>{new Date(this.state.timestamp).toLocaleString()}</td>
                <td>{button}</td>
            </tr>
        )
    }
}

class InviteData extends React.Component {
    constructor(props) {
        super(props)

        this.getDataFromService = this.getDataFromService.bind(this)

        this.getDataFromService()
    }

    componentDidMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getInvites(this.props.token)
    }

    render() {
        var sentRowComponents = this.props.sent.allIDs.map(id => {
            return <InviteRow key={id} data={this.props.sent.byID[id]} token={this.props.token} deleteInvite={this.props.deleteInvite}/>
        })
        var pendingRowComponents = this.props.pending.allIDs.map(id => {
            return <InviteRow key={id} data={this.props.pending.byID[id]} token={this.props.token} acceptInvite={this.props.acceptInvite}/>
        })
        return(
            <div className="col-md-6">
                <h4>Sent Invites:</h4>
                <InviteList name="sent" rows={sentRowComponents}/>
                <p/>
                <h4>Pending Invites:</h4>
                <InviteList name="pending" rows={pendingRowComponents}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteData)