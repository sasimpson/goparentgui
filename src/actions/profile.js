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
import {flashSuccessMessage} from 'redux-flash'


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
                if (data.sentInviteData != null) {
                    dispatch(updateSentInvites(data.sentInviteData))
                }
                if (data.pendingInviteData != null) {
                    dispatch(updatePendingInvites(data.pendingInviteData))
                }
            })
            .catch(e => console.log(e))
    }
}

export const postInvite = (token, email) => {
    var form = new FormData();
    form.append("email", email)
    const data = new URLSearchParams(form)
    return (dispatch) => {
        dispatch(sentInviteWillPostData())
        return fetch(getUrl("/api/user/invite"),{
            method: "POST",
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: data
        })
            .then(r => {
                dispatch(getInvites(token))
                dispatch(flashSuccessMessage("sent invite!"))
            })
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
            .then(r => {
                dispatch(sentInviteDidDelete(id))
                dispatch(flashSuccessMessage("removed sent invite"))
            })
            .catch(e => console.log(e))
    }
}

export const acceptInvite = (token, id) => {
    return (dispatch) => {
        dispatch(pendingInvitePendingAccept())
        return fetch(getUrl("/api/user/invite/accept/" + id), {
            method: "POST", 
            headers: {
                'Authorization': "Bearer " + token
            }
        })
            .then(r => {
                dispatch(pendingInviteAccepted(id))
                dispatch(flashSuccessMessage("invite accepted!"))
            })
            .catch(e => console.log(e))
    }
}