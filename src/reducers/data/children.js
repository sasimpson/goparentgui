import {CHILDREN_LOAD_DATA, CLEAR_DATA} from '../../actions/index'

var initialState = {byID:{}, allIDs: []}

var childrenReducer = function(state = initialState, action) {
    // console.log("childReducer: ", action.type, action.payload)
    switch (action.type) {
        case CHILDREN_LOAD_DATA:
            console.log(CHILDREN_LOAD_DATA)
            var newState = initialState
            if (action.payload.children) {
                action.payload.children.forEach(
                    (e) => {
                    newState.byID[e.id] = e
                    newState.allIDs.push(e.id)
                }, this);
            }     
            return Object.assign(initialState, state, newState)
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default childrenReducer