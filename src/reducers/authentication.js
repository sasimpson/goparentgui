import {UPDATE_FIELD_AUTH, LOGIN_IN_PROGRESS, LOGIN_USER, LOGOUT_USER} from '../actions/index'
import {stateTree} from './index'

var authReducer = function(state = stateTree.authentication, action) {
    switch (action.type){
        case UPDATE_FIELD_AUTH:
            console.log(UPDATE_FIELD_AUTH)
            //TODO: make this not suck:
            let obj = Object.assign({}, state, {})
            obj.auth[action.key] = action.value
            return obj
        case LOGIN_IN_PROGRESS:
            console.log(LOGIN_IN_PROGRESS)
            return Object.assign({}, state, {
                isAuthenticating: true
            })
        case LOGIN_USER:
            console.log(LOGIN_USER)
            return Object.assign({}, state, {
                isAuthenticated: true,
                isAuthenticating: false,
                user: action.payload.userData,
                auth: {
                    token: action.payload.token
                }
            })
        case LOGOUT_USER:
            console.log(LOGOUT_USER)
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