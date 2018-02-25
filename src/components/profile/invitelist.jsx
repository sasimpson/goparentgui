import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getPendingInvites} from '../../actions/profile'

var mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        invites: state.entities.invites,
    }
}

var mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getPendingInvites: getPendingInvites
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

const InviteRow = (props) => {
    return (
        <tr>
            <td>{props.data.inviteEmail}</td>
            <td>{new Date(props.data.timestamp).toLocaleString()}</td>
            <td></td>
        </tr>
    )
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
        this.props.getPendingInvites(this.props.token)
    }

    render() {
        var rowComponents = this.props.invites.allIDs.map(id => {
            return <InviteRow key={id} data={this.props.invites.byID[id]}/>
        })
        return(
            <div className="col-md-6">
                <h4>Pending invites:</h4>
                <InviteList rows={rowComponents}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteData)