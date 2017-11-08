import {
    CHILDREN_LOAD_DATA, 
    CHILDREN_FETCH_DATA,
    CLEAR_DATA
} from '../../actions/index'

var initialState = {byID:{}, allIDs: []}

var childrenReducer = function(state = initialState, action) {
    switch (action.type) {
        case CHILDREN_FETCH_DATA:
            console.log(action.type)
            return initialState
        case CHILDREN_LOAD_DATA:
            console.log(action.type)
            var newState = initialState
            if (action.payload.children) {
                action.payload.children.forEach(
                    (e) => {
                    newState.byID[e.id] = e
                    newState.allIDs.push(e.id)
                })
            }     
            return Object.assign(initialState, state, newState)
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default childrenReducer