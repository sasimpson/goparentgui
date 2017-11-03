import {combineReducers} from 'redux'
import authReducer from './authentication'
import dataReducer from './data'
import settingsReducer from './settings'

import {CHILD_FORM_EDIT, CHILD_FORM_CLEAR, CLEAR_DATA } from '../actions/index'

export var stateTree = {
    app: {
        version: "0.00"
    },
    authentication: {
        auth: {},
        user: {},
        isAuthenticated: false,
        isAuthenticating: false,
    },
    data: {
        children: [],
        sleep: [],
        diaper: [],
        feeding: []
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

/*

var newStateTreeDesign = {
    app : {
        version : "0.00"
    },
    api : {
        version : ""
    },
    authentication : {
        auth : {},
        user : {},
        isAuthenticated: false,
        isAuthenticating: false,
    },
    settings : {
        currentChild : null
    },
    entities: {
        children : {
            byID : {    
                "194afbe5-4e55-4170-8790-5bcb50cf593e" : {
                    id : "194afbe5-4e55-4170-8790-5bcb50cf593e",
                    name : "Tommy",
                    birthday : "2017-03-01T08:00:00Z",
                    parentID : "0cd3261f-13b1-480d-9098-022b59272f5f"
                },
                "15a98468-5a04-41db-9b3f-5c495267ccc1" : {
                    id : "15a98468-5a04-41db-9b3f-5c495267ccc1",
                    name : "Jane",                
                    birthday : "2011-03-19T07:00:00Z",
                    parentID : "0cd3261f-13b1-480d-9098-022b59272f5f"
                },
            },
            allIDs : ["194afbe5-4e55-4170-8790-5bcb50cf593e", "15a98468-5a04-41db-9b3f-5c495267ccc1"]
        },
        feeding : {
            byID : {
                "97a66625-80d0-4d77-a15d-599ce66ac502" : {
                    "childID": "194afbe5-4e55-4170-8790-5bcb50cf593e",
                    "feedingAmount": 3,
                    "feedingSide": "",
                    "feedingType": "bottle",
                    "id": "97a66625-80d0-4d77-a15d-599ce66ac502",
                    "timestamp": "2017-11-02T23:37:24.803Z",
                    "userid": "0cd3261f-13b1-480d-9098-022b59272f5f"
                },
                "780e67f7-4e92-4a21-94db-b709d4cd377f" : {
                    "childID": "194afbe5-4e55-4170-8790-5bcb50cf593e",
                    "feedingAmount": 3,
                    "feedingSide": "",
                    "feedingType": "bottle",
                    "id": "780e67f7-4e92-4a21-94db-b709d4cd377f",
                    "timestamp": "2017-11-02T23:37:24.803Z",
                    "userid": "0cd3261f-13b1-480d-9098-022b59272f5f"
                }
            },
            allIDs : ["97a66625-80d0-4d77-a15d-599ce66ac502", "780e67f7-4e92-4a21-94db-b709d4cd377f"]
        }
    }
}
*/
