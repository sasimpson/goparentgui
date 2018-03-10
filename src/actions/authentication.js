import {
    LOGIN_USER, 
    LOGOUT_USER, 
    LOGIN_IN_PROGRESS, 
    LOGIN_FAILED
} from './index'

import {getUrl} from '../utils/index'

// import {getChildren} from './children'
import {getFeedings} from './feeding'
import {getDiaper} from './diaper'
import {getSleep} from './sleep'
import { flashSuccessMessage, flashErrorMessage } from 'redux-flash/lib/actions';

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
        var urlToRequest = getUrl("/api/user/login")
        return fetch(urlToRequest, {method: "POST", body: data})
            .then(r => r.json())
            .then(data => {
                dispatch(flashSuccessMessage("login successful!"))
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
