import {combineReducers} from 'redux'
import authReducer from './authentication'
import dataReducer from './data'
import settingsReducer from './settings'

import {CHILD_FORM_EDIT, CHILD_FORM_CLEAR, CLEAR_DATA } from '../actions/index'

export var stateTree = {
    app: {
        version: "0.00"
    },
    authenitcation: {
        auth: {},
        user: {},
        isAuthenticated: false,
        isAuthenticating: false,
    },
    data: {
        children: []
    },
    settings: {
        currentChild: null
    },
    forms: {
        childForm: {
            name: "",
            birthday: null,
            id: ""
        }
    }
}
var formsInitialState = {
    childForm: {
        name: "",
        birthday: new Date(),
        id: null
    }
}
 
var reducer = combineReducers({
    authentication: authReducer,
    data: dataReducer,
    settings: settingsReducer,
    forms: function(state = formsInitialState, action) {
        switch(action.type) {
            case CHILD_FORM_EDIT:
                console.log(CHILD_FORM_EDIT)
                console.log(action)
                return Object.assign({}, state, {childForm: {
                    name: action.payload.name,
                    birthday: action.payload.birthday,
                    id: action.payload.id 
                }})
            case CHILD_FORM_CLEAR:
                console.log(CHILD_FORM_CLEAR)
                return Object.assign({}, state, {childForm: formsInitialState.childForm})
            case CLEAR_DATA:
                console.log(CLEAR_DATA)
                return Object.assign({}, state, {childForm: formsInitialState.childForm})
            default:
                return state
        }
    },
})


export default reducer