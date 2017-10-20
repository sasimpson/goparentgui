import {combineReducers} from 'redux'
import authReducer from './authentication'
import dataReducer from './data'

// const initialState = {
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
//     }
// }
 

var reducer = combineReducers({
    authentication: authReducer,
    data: dataReducer
})


export default reducer