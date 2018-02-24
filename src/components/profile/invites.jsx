import React from 'react'

import InviteForm from './inviteform'
import InviteList from './invitelist'

export default class Invites extends React.Component {
    render() {
        return(
            <div className="row">
                <InviteForm/>
                <InviteList/>
            </div>
        )
    }
}