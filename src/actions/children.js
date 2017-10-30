import { CHILDREN_LOAD_DATA, CHILD_FORM_CLEAR } from './index'

export const getChildren = (token) => {
    console.log("getChildren")
    return (dispatch) => {
        return fetch("http://localhost:8000/api/children", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => { dispatch({type: CHILDREN_LOAD_DATA, payload: data}) })
            .catch(e => console.log(e))
    }
}

export const postChild = (token, data) => {
    console.log("postChild")
    return (dispatch) => {
        return fetch("http://localhost:8000/api/children", {
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
            .then(data => dispatch(getChildren(token)))
            .catch(e => console.log(e))
    }
}

export const deleteChild = (token, childID) => {
    console.log("deleteChild")
    return (dispatch) => {
        return fetch("http://localhost:8000/api/children/" + childID, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => dispatch(getChildren(token)))
            .catch(e => console.log(e))
    }
}

export const editChild = (token, data) => {
    console.log("editChild")
    return (dispatch) => {
        return fetch("http://localhost:8000/api/children/" + data.id, {
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
            // .then(data => { dispatch({type: CHILD_FORM_EDIT, payload: data}) })
            .then(data => dispatch(getChildren(token)))
            .catch(e => console.log(e))
    }
}

export const clearChildForm = () => {
    console.log("clearChildForm")
    return (dispatch) => {
        dispatch({type: CHILD_FORM_CLEAR, payload: null})
    }
}