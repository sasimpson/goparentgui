export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS'
export const UPDATE_FIELD_AUTH = 'UPDATE_FIELD_AUTH'

export const loginUser = (text) => {
    return { type: LOGIN_USER, payload: text}
}

export const logoutUser = () => {
    return { type: LOGOUT_USER}
}

//thunk
export const loginNow = (username, password) => {
    console.log("loginNow", username, password)
    var data = new FormData();
    data.append("username", username)
    data.append("password", password)
    console.log(data)
    return (dispatch) => {
        dispatch({ type: LOGIN_IN_PROGRESS })
        return fetch("http://localhost:8000/api/user/login", {method: "POST", body: data})
            .then(r => r.json())
            .then(data => dispatch({type: LOGIN_USER, payload: data}))
            .catch(e => console.log(e))
    }
}