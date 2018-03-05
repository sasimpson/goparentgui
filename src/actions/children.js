import { 
    CHILDREN_LOAD_DATA, 
    CHILDREN_WILL_POST,
    CHILDREN_ADD_DATA,
    CHILDREN_DELETE_DATA,
} from './index'

import {getUrl} from '../utils/index'
import { flashMessage } from 'redux-flash/lib/actions';

const childrenLoadData = (data) => {
    return {type: CHILDREN_LOAD_DATA, payload: data}
}

const childrenWillPostData = () => {
    return {type: CHILDREN_WILL_POST}
}

const childrenAddPostData = (data) => {
    return {type: CHILDREN_ADD_DATA, payload: data}
}

const childrenDeleteData = (data) => {
    return {type: CHILDREN_DELETE_DATA, payload: data}
}

export const getChildren = (token) => {
    return (dispatch) => {
        return fetch(getUrl("/api/children"), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => { 
                dispatch(childrenLoadData(data))
            })
            .catch(e => console.log(e))
    }
}

export const postChild = (token, data) => {
    return (dispatch) => {
        dispatch(childrenWillPostData())
        return fetch(getUrl("/api/children"), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                childData: {
                    name: data.name,
                    birthday: data.birthday
                }
            })
        })
            .then(r => r.json())
            .then(data => {
                dispatch(childrenAddPostData(data))
                dispatch(flashMessage("child added"))
            })
            .catch(e => console.log(e))
    }
}

export const deleteChild = (token, childID) => {
    return (dispatch) => {
        return fetch(getUrl("/api/children/" + childID), {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => {
                dispatch(childrenDeleteData({id: childID}))
                dispatch(flashMessage("child deleted"))
            })
            .catch(e => console.log(e))
    }
}

export const editChild = (token, data) => {
    return (dispatch) => {
        return fetch(getUrl("/api/children/" + data.id), {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                childData: {
                    id: data.id,
                    name: data.name,
                    birthday: data.birthday,
                    parentID: data.parentID
                }
            })
        })
            .then(r => r.json())
            .then(data => getChildren(token))  //should probably just send api command and update redux instead
            .catch(e => console.log(e))
    }
}
