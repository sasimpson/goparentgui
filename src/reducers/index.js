import {combineReducers} from 'redux'
import authReducer from './authentication'
import dataReducer from './data'
import settingsReducer from './settings'

// stateTree = {
//     app: {
//         version: "0.00"
//     },
//     authenitcation: {
//         auth: {},
//         user: {},
//         isAuthenticated: false,
//         isAuthenticating: false,
//     },
//     data: {
//         children: []
//     },
//     settings: {
//         currentChild: null
//     }
// }
 

var reducer = combineReducers({
    authentication: authReducer,
    data: dataReducer,
    settings: settingsReducer
})


export default reducer