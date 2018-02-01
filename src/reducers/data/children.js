import {
    CHILDREN_LOAD_DATA, 
    CHILDREN_WILL_POST,
    CHILDREN_ADD_DATA,
    CHILDREN_DELETE_DATA,
    CLEAR_DATA
} from '../../actions/index'

import {addItemToStateEntity} from '../../utils/'

var initialState = {byID:{}, allIDs:[]}

var childrenReducer = function(state = initialState, action) {
    switch (action.type) {
        case CHILDREN_WILL_POST:
            return state
        case CHILDREN_LOAD_DATA:
            var newState = state
            if (action.payload.children) {
                action.payload.children.forEach(
                    (e) => {
                        newState.byID[e.id] = e
                        if (!newState.allIDs.includes(e.id)) {
                            newState.allIDs.push(e.id)
                        }
                    }
                )
            } 
            return newState
        case CHILDREN_ADD_DATA:
            return addItemToStateEntity(state, action.payload)
            // newState = state
            // if (!newState.allIDs.includes(action.payload.id)) {
            //     newState.allIDs.push(action.payload.id)
            //     newState.byID[action.payload.id] = action.payload
            // }
            // return newState
        case CHILDREN_DELETE_DATA:
            newState = state
            if (newState.allIDs.includes(action.payload.id)) {
                var index = newState.allIDs.indexOf(action.payload.id)
                if (index > -1) {
                    delete newState.allIDs[index]
                    delete newState.byID[action.payload.id]
                }
            } 
            return newState

        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default childrenReducer