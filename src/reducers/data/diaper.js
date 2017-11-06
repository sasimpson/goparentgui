import {DIAPER_LOAD_DATA, CLEAR_DATA} from '../../actions/index'

var initialState = {byID:{}, allIDs: []}

var diaperReducer = function(state = initialState, action) {
    switch (action.type) {
        case DIAPER_LOAD_DATA:
            console.log(DIAPER_LOAD_DATA)
            var newState = initialState
            if (action.payload.wasteData) {
                action.payload.wasteData.forEach( (e) => {
                    newState.byID[e.id] = e
                    newState.allIDs.push(e.id)
                });
                
            }
            return newState
        case CLEAR_DATA:
            console.log(CLEAR_DATA)
            return initialState
        default: 
            return state
    }
}

export default diaperReducer