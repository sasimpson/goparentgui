import {CHILDREN_LOAD_DATA, CLEAR_DATA} from '../actions/index'

var childrenReducer = function(state = [], action) {
    switch (action.type) {
        case CHILDREN_LOAD_DATA:
            console.log(CHILDREN_LOAD_DATA)
            if (action.payload.children == null) {
                return state
                
            }
            var newState = [
                    ...action.payload.children
                ]
            return Object.assign([], state, newState)
        case CLEAR_DATA:
            return []
        default: 
            return state
    }
}

export default childrenReducer