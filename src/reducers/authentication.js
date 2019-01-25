import {LOGIN_IN_PROGRESS, LOGIN_USER, LOGOUT_USER, LOGIN_FAILED, CLEAR_DATA, PASSWORD_RESET} from '../actions/index'
import KJUR from 'jsrsasign'
import {stateTree} from './index'

var authReducer = function(state = stateTree.authentication, action) {
    switch (action.type){
        case LOGIN_IN_PROGRESS:
            return Object.assign({}, state, {
                isAuthenticating: true
            })
        case LOGIN_USER:
            var jwtPayload = KJUR.jws.JWS.readSafeJSONString(KJUR.b64utos(action.payload.token.split(".")[1]))
            console.log()
            // console.log(KJUR.jws.JWS.readSafeJSONString(b64utoutf8(action.payload.token.split("."))))
            return Object.assign({}, state, {
                isAuthenticated: true,
                isAuthenticating: false,
                user: action.payload.userData,
                auth: {
                    token: action.payload.token,
                    expires: new Date(jwtPayload.exp * 1000)
                }
            })
        case PASSWORD_RESET:
            if (action.status === "ok") {
                return Object.assign({}, state, {
                    resetPassword: true,
                    status: action.status
                })
            } else {
                return Object.assign({}, state, {
                    resetPassword: false,
                    status: action.status
                })
            }
            
        case LOGIN_FAILED:
        case CLEAR_DATA:
        case LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isAuthenticating: false,
                user: {},
                auth: {},
            })
        default:
            return state
    }
}

export default authReducer