import {
    STATISTICS_LOAD,
    CLEAR_DATA
} from '../../actions/index'

var initialState = {byID: {}, allIDs: []}

var statisticsReducer = function(state = initialState, action) {
    switch (action.type) {
        case STATISTICS_LOAD:
            console.log(action)
            var newState = state
            if (action.payload) {
                newState.byID[action.payload.childData.id] = action.payload.stats
                if (!newState.allIDs.includes(action.payload.childData.id)){
                    newState.allIDs.push(action.payload.childData.id)
                }
            }
            return state
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default statisticsReducer