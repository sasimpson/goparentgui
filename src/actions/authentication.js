import {LOGIN_USER, LOGOUT_USER, LOGIN_IN_PROGRESS, LOGIN_FAILED} from './index'
import {getChildren} from './children'

//pure functions
export const loginInProgress = () => {
    return { type: LOGIN_IN_PROGRESS }
}

export const logoutUser = () => {
    return { type: LOGOUT_USER }
}

export const loginFailed = () => {
    return { type: LOGIN_FAILED}
}
export const loginUser = (data) => {
    return { type: LOGIN_USER, payload: data}
}

export const loginNow = (username, password) => {
    var data = new FormData();
    data.append("username", username)
    data.append("password", password)
    return (dispatch) => {
        dispatch(loginInProgress())
        return fetch("/api/user/login", {method: "POST", body: data})
            .then(r => r.json())
            .then(data => {
                console.log("loginNow", data)
                dispatch(loginUser(data))
                console.log("calling getchildren from loginNow")
                getChildren(data.token)
            })
            .catch(e => {
                dispatch(loginFailed())
                console.log(e)
            })
    }
}
