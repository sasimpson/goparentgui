import {
    LOGIN_USER, 
    LOGOUT_USER, 
    LOGIN_IN_PROGRESS, 
    LOGIN_FAILED,
    CHECK_AUTH,
    PASSWORD_RESET
} from './index'

import {getUrl} from '../utils/index'

// import {getChildren} from './children'
import {getFeedings} from './feeding'
import {getDiaper} from './diaper'
import {getSleep} from './sleep'
import { flashSuccessMessage, flashErrorMessage } from 'redux-flash/lib/actions';
import 'whatwg-fetch'

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

export const checkAuth = () => {
    return { type: CHECK_AUTH }
}

export const passwordReset = (status) => {
    return { type: PASSWORD_RESET, status: status}
}

export const loginNow = (username, password) => {
    var data = new FormData()
    data.append("username", username)
    data.append("password", password)
    return (dispatch) => {
        dispatch(loginInProgress())
        var urlToRequest = getUrl("/api/user/login")
        return fetch(urlToRequest, {method: "POST", body: data})
            .then(r => r.json())
            .then(data => {
                dispatch(flashSuccessMessage("login successful!", {timeout: 500}))
                dispatch(loginUser(data))
                // getChildren(data.token)
                getFeedings(data.token)
                getDiaper(data.token)
                getSleep(data.token)
            })
            .catch(e => {
                dispatch(loginFailed())
                dispatch(flashErrorMessage("login failed, please check email and password"))
                console.log(e)
            })
    }
}

export const updateToken = (token) => {
    return (dispatch) => {
        dispatch(loginInProgress())
        return fetch(getUrl("/api/user/refresh"),{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => dispatch(loginUser(data)))
            .catch(e => console.log(e))
    }
}

export const checkAuthentication = (auth) => {
    return (dispatch) => {
        var now = new Date()
        var exp = Date.parse(auth.expires)
        if (exp < now) {
            dispatch(flashErrorMessage("your login has expired, please login again"), {timeout: 1000})
            dispatch(logoutUser())
        } else {
            if ((exp - now)/60000 <= 5.0) {
                dispatch(updateToken(auth.token))
            } 
        }
    }
}
export const resetPasswordRequest = (email) => {
    console.log("resetpasswordrequest: ", email)
    var data = new FormData()
    data.append("email", email)
    return (dispatch) => {
        return fetch(getUrl("/api/user/resetpassword"), {method: "POST", body: data})
            .then(r => {
                if (r.status === 202) {
                    dispatch(resetPasswordRequest("ok"))
                } else {
                    dispatch(resetPasswordRequest(r.statusText))
                }
            })
    }
}