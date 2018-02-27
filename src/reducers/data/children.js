import {
    CHILDREN_LOAD_DATA, 
    CHILDREN_WILL_POST,
    CHILDREN_ADD_DATA,
    CHILDREN_DELETE_DATA,
    CLEAR_DATA
} from '../../actions/index'

import {omit} from 'lodash'

var initialState = {byID:{}, allIDs:[]}

var childrenReducer = function(state = initialState, action) {
    switch (action.type) {
        case CHILDREN_WILL_POST:
            return state
        case CHILDREN_LOAD_DATA:
            var byID = {}
            var allIDs = []
            action.payload.children.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            return {...state, byID: byID, allIDs: allIDs}
        case CHILDREN_ADD_DATA:
            return {
                ...state, 
                byID:  {...state.byID, [action.payload.id]: action.payload}, 
                allIDs: state.allIDs.includes(action.payload.id) ? [...state.allIDs] : [...state.allIDs, action.payload.id]
            }
        case CHILDREN_DELETE_DATA:
            return {
                ...state, 
                allIDs: state.allIDs.filter( id => id !== action.payload.id),
                byID: omit(state.byID, action.payload.id)
            }
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default childrenReducer