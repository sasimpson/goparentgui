// import {combineReducers} from 'redux'
import {UPDATE_FIELD_AUTH, LOGIN_USER, LOGIN_IN_PROGRESS} from '../actions/index'

const initialState = {
    app: {
        version: "0.00"
    },
    auth: {},
    user: {},
    isAuthenticated: false,
    isAuthenticating: false,
    data: {
        sleep: {},
        feeding: {},
        diaper: {}
    }
}

var reducer = function(state = initialState, action) {
    console.log(action)
    switch (action.type){
        case UPDATE_FIELD_AUTH:
            //TODO: make this not suck:
            let obj = Object.assign({}, state, {})
            obj.auth[action.key] = action.value
            return obj
        case LOGIN_IN_PROGRESS:
            return Object.assign({}, state, {
                isAuthenticating: true
            })
        case LOGIN_USER:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isAuthenticating: false,
                user: action.payload.userData,
                auth: {
                    token: action.payload.token
                }
            })
        default:
            return state
    }
}

export default reducer