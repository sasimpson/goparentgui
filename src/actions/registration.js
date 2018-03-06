import {
    REGISTRATION_SUBMITTED,
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESSFUL
} from './index'

import {getUrl} from '../utils/index'
import {loginNow} from './authentication'
import { flashSuccessMessage, flashErrorMessage } from 'redux-flash/lib/actions';

export const registrationSubmitted = (data) => {
    return {type: REGISTRATION_SUBMITTED, payload: data}
}

export const registrationError = (error) => {
    return {type: REGISTRATION_ERROR, payload: error}
}

export const registrationSuccessful = () => {
    return {type: REGISTRATION_SUCCESSFUL}
}

export const submitRegistration = (data) => {
    var newUserData = JSON.stringify({
        userData: {
            name: data.name,
            email: data.email,
            username: data.email,
            password: data.password1
        }
    })
    return (dispatch) => {
        dispatch(registrationSubmitted())
        return fetch(getUrl("/api/user/"), {method: "POST", body: newUserData})
            .then(r =>  r.json())
            .then(data => {
                dispatch(registrationSuccessful())
                dispatch(flashSuccessMessage("registration successful"))
                loginNow(data.email, data.password1)
            })
            .catch(e => {
                dispatch(registrationError(e))
                flashErrorMessage("registration failed to save")
                console.log(e)
            })
    }
}