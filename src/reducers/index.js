import {combineReducers} from 'redux'
import authReducer from './authentication'
import dataReducer from './data/index'
import settingsReducer from './settings'

export var stateTree = {
    app : {
        version: "0.00"
    },
    api : {
        version: ""
    },
    authentication : {
        auth : {},
        user : {},
        isAuthenticated : false,
        isAuthenticating : false,
    },
    settings : {
        currentChild : null
    },
    entities : {
        children : {
            byID: {},
            allIDs: []
        },
        sleep : {
            byID: {},
            allIDs: []
        },
        diaper : {
            byID: {},
            allIDs: []
        },
        feeding : {
            inProgress: false,
            byID: {},
            allIDs: []
        },
        statistics : {
            byID: {},
            allIDs: []
        },
        invites :{
            sent: {
                byID: {},
                allIDs: []
            },
            pending: {
                byID: {},
                allIDs: []
            }
        }
    }
}
 
var reducer = combineReducers({
    authentication: authReducer,
    settings: settingsReducer,    
    entities: dataReducer
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
