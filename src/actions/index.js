export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(text) {
    return { type: LOGIN_USER, text}
}

export function logoutUser() {
    return { type: LOGOUT_USER}
}