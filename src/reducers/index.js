import {combineReducers} from 'redux'
import authReducer from './authentication'
import dataReducer from './data/index'
import settingsReducer from './settings'

import {reducer as flashReducer} from 'redux-flash'

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
            allIDs: [],
            graphData: {
                data: [],
                options: {},
                chartReady: false
            }
        },
        feeding : {
            inProgress: false,
            byID: {},
            allIDs: [],
            graphData: {
                data: [],
                options: {},
                chartReady: false
            }
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
    flash: flashReducer,
    authentication: authReducer,
    settings: settingsReducer,    
    entities: dataReducer
})

export default reducer