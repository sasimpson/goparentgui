import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from 'react-bootstrap'
import MdDelete from 'react-icons/lib/md/delete'
import MdAdd from 'react-icons/lib/md/add'

import {getInvites, deleteInvite} from '../../actions/profile'

var mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        entities: state.entities,
    }
}

var mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getInvites: getInvites,
        deleteInvite: deleteInvite
    }, dispatch)
}

const InviteList = (props) => {
    return (
        <table className="table table-condensed table-striped">
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
    //     this.props.acceptInvite(this.props.token, this.state.id)
        console.log("accept invite ", this.state.id)
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
    }

    componentDidMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getInvites(this.props.token)
    }

    render() {
        var sentRowComponents = this.props.entities.invites.sent.allIDs.map(id => {
            return <InviteRow key={id} data={this.props.entities.invites.sent.byID[id]} token={this.props.token} deleteInvite={this.props.deleteInvite}/>
        })
        var pendingRowComponents = this.props.entities.invites.pending.allIDs.map(id => {
            return <InviteRow key={id} data={this.props.entities.invites.pending.byID[id]} token={this.props.token} acceptInvite="foo"/>
        })
        return(
            <div className="col-md-6">
                <h4>Sent Invites:</h4>
                <InviteList rows={sentRowComponents}/>
                <p/>
                <h4>Pending Invites:</h4>
                <InviteList rows={pendingRowComponents}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteData)