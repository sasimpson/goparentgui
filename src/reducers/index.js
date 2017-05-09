// import {combineReducers} from 'redux'
import {UPDATE_FIELD_AUTH, LOGIN_USER} from '../actions/index'

const initialState = {
    app: {
        version: "0.00"
    },
    auth: {},
    user: {},
    isAuthenticated: false,
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
        case LOGIN_USER:
            return Object.assign({}, state, {
                user: action.payload
            })
        default:
            return state
    }
}

export default reducer