import {INVITES_UPDATE, INVITES_WILL_POST} from './index'
import {getUrl} from '../utils/index'


const updateInvites = (data) => {
    return {type: INVITES_UPDATE, payload: data}
}

const inviteWillPostData = () => {
    return {type: INVITES_WILL_POST}
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