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
            .then(handleErrors)
            .then(data => {
                dispatch(registrationSuccessful())
                dispatch(flashSuccessMessage("registration successful", {timeout: 500}))
                loginNow(data.email, data.password1)
            })
            .catch(e => {
                dispatch(flashErrorMessage("registration failed to save"))
                dispatch(registrationError(e))
                console.log(e)
            })
    }
}

const handleErrors = response => {
    console.log("response ok?:", response.ok)
    if (!response.ok) {
        throw Error(response.StatusText)
    }
    return response.json()
}