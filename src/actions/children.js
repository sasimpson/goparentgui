import { 
    CHILDREN_LOAD_DATA, 
    CHILDREN_FETCH_DATA 
} from './index'

import {getUrl} from '../utils/index'

const childrenFetchingData = () => {
    return {type: CHILDREN_FETCH_DATA}
}

const childrenLoadData = (data) => {
    return {type: CHILDREN_LOAD_DATA, payload: data}
}

export const getChildren = (token) => {
    return (dispatch) => {
        dispatch(childrenFetchingData())
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
            .then(data => getChildren(token))  //should probably just send api command and update redux instead
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
            .then(data => getChildren(token))  //should probably just send api command and update redux instead
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
