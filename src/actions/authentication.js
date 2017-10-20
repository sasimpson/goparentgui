import {LOGIN_USER, LOGOUT_USER, LOGIN_IN_PROGRESS} from './index'

export const loginUser = (text) => {
    return { type: LOGIN_USER, payload: text}
}

export const logoutUser = () => {
    return { type: LOGOUT_USER}
}

export const loginNow = (username, password) => {
    var data = new FormData();
    data.append("username", username)
    data.append("password", password)
    return (dispatch) => {
        dispatch({ type: LOGIN_IN_PROGRESS })
        return fetch("http://localhost:8000/api/user/login", {method: "POST", body: data})
            .then(r => r.json())
            .then(data => dispatch({type: LOGIN_USER, payload: data}))
            .catch(e => console.log(e))
    }
}
