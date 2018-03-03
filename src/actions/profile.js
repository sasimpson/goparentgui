import {
    SENT_INVITES_UPDATE,
    SENT_INVITES_WILL_POST, 
    SENT_INVITE_WILL_DELETE, 
    SENT_INVITE_DID_DELETE,
    PENDING_INVITES_UPDATE,
    PENDING_INVITE_PENDING_ACCEPT,
    PENDING_INVITE_ACCEPTED
} from './index'
import {getUrl} from '../utils/index'


const updateSentInvites = (data) => {
    return {type: SENT_INVITES_UPDATE, payload: data}
}

const updatePendingInvites = (data) => {
    return {type: PENDING_INVITES_UPDATE, payload: data}
}


const sentInviteWillPostData = () => {
    return {type: SENT_INVITES_WILL_POST}
}

const sentInviteWillDelete = () => {
    return {type: SENT_INVITE_WILL_DELETE}
}

const sentInviteDidDelete = (id) => {
    return {type: SENT_INVITE_DID_DELETE, payload: {id: id}}
}

const pendingInvitePendingAccept = () => {
    return {type: PENDING_INVITE_PENDING_ACCEPT}
}

const pendingInviteAccepted = (id) => {
    return {type: PENDING_INVITE_ACCEPTED, payload: {id: id}}
}

export const getInvites = (token) => {
    return (dispatch) => {
        return fetch(getUrl("/api/user/invite"), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                dispatch(updateSentInvites(data.sentInviteData))
                dispatch(updatePendingInvites(data.pendingInviteData))
            })
            .catch(e => console.log(e))
    }
}

export const postInvite = (token, email) => {
    var data = new FormData();
    data.append("email", email)
    return (dispatch) => {
        dispatch(sentInviteWillPostData())
        return fetch(getUrl("/api/user/invite"),{
            method: "POST",
            headers: {
                'Authorization': "Bearer " + token
            },
            body: data
        })
            .then(r => dispatch(getInvites(token)))
            .catch(e => console.log(e))
    }
}

export const deleteInvite = (token, id) => {
    return (dispatch) => {
        dispatch(sentInviteWillDelete())
        return fetch(getUrl("/api/user/invite/" + id), {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + token
            }
        })
            .then(r => dispatch(sentInviteDidDelete(id)))
            .catch(e => console.log(e))
    }
}

export const acceptInvite = (token, id) => {
    return (dispatch) => {
        dispatch(pendingInvitePendingAccept())
        return fetch(getUrl("/api/user/invite/accept/" + id), {
            method: "POST", 
            headers: {
                'Authorization': "Bearer" + token
            }
        })
            .then(r => dispatch(pendingInviteAccepted(id)))
            .catch(e => console.log(e))
    }
}