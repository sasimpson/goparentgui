import {DIAPER_LOAD_DATA, CLEAR_DATA} from '../actions/index'

var diaperReducer = function(state = [], action) {
    switch (action.type) {
        case DIAPER_LOAD_DATA:
            console.log(DIAPER_LOAD_DATA)
            if (action.payload.wasteData == null) {
                return state
                
            }
            var newState = [
                    ...action.payload.wasteData
                ]
            return newState
        case CLEAR_DATA:
            console.log(CLEAR_DATA)
            return []
        default: 
            return state
    }
}

export default diaperReducer