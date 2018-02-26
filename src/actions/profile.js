import {INVITES_UPDATE, INVITES_WILL_POST, INVITE_WILL_DELETE, INVITE_DID_DELETE} from './index'
import {getUrl} from '../utils/index'


const updateInvites = (data) => {
    return {type: INVITES_UPDATE, payload: data}
}

const inviteWillPostData = () => {
    return {type: INVITES_WILL_POST}
}

const inviteWillDelete = () => {
    return {type: INVITE_WILL_DELETE}
}

const inviteDidDelete = (id) => {
    return {type: INVITE_DID_DELETE, payload: id}
}

export const getPendingInvites = (token) => {
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
            .then(data => dispatch(updateInvites(data)))
            .catch(e => console.log(e))
    }
}

export const postInvite = (token, email) => {
    var data = new FormData();
    data.append("email", email)
    return (dispatch) => {
        dispatch(inviteWillPostData())
        return fetch(getUrl("/api/user/invite"),{
            method: "POST",
            headers: {
                'Authorization': "Bearer " + token
            },
            body: data
        })
            .then(r => dispatch(getPendingInvites(token)))
            .catch(e => console.log(e))
    }
}

export const deleteInvite = (token, id) => {
    console.log(token, id)
    return (dispatch) => {
        dispatch(inviteWillDelete())
        return fetch(getUrl("/api/user/invite/" + id), {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + token
            }
        })
            .then(r => dispatch(inviteDidDelete(id)))
            .catch(e => {
                dispatch(getPendingInvites(token))
                console.log(e)
            })
    }
}