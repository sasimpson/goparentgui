import {
    SLEEP_LOAD_DATA,
    SLEEP_FETCH_DATA,
    CLEAR_DATA
} from '../../actions/index'

var initialState = {byID:{}, allIDs: []}

var sleepReducer = function(state = initialState, action) {
    switch (action.type) {
        case SLEEP_FETCH_DATA:
            return state
        case SLEEP_LOAD_DATA:
            var byID = {}
            var allIDs = []
            action.payload.sleepData.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            return {...state, byID: byID, allIDs: allIDs}
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default sleepReducer