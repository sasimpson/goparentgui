import {LOGIN_IN_PROGRESS, LOGIN_USER, LOGOUT_USER, LOGIN_FAILED, CLEAR_DATA} from '../actions/index'
import {stateTree} from './index'

var authReducer = function(state = stateTree.authentication, action) {
    switch (action.type){
        case LOGIN_IN_PROGRESS:
            console.log(action.type)
            return Object.assign({}, state, {
                isAuthenticating: true
            })
        case LOGIN_USER:
            console.log(action.type)
            return Object.assign({}, state, {
                isAuthenticated: true,
                isAuthenticating: false,
                user: action.payload.userData,
                auth: {
                    token: action.payload.token
                }
            })
        case LOGIN_FAILED:
        case CLEAR_DATA:
        case LOGOUT_USER:
            console.log(action.type)
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