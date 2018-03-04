import {
    DIAPER_LOAD_DATA,
    CLEAR_DATA
} from '../../actions/index'

var initialState = {byID:{}, allIDs: []}

var diaperReducer = function(state = initialState, action) {
    switch (action.type) {
        case DIAPER_LOAD_DATA:
            var byID = {}
            var allIDs = []
            action.payload.wasteData.forEach( e => {
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

export default diaperReducer