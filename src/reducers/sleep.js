import {SLEEP_LOAD_DATA, CLEAR_DATA} from '../actions/index'

var sleepReducer = function(state = [], action) {
    switch (action.type) {
        case SLEEP_LOAD_DATA:
            console.log(SLEEP_LOAD_DATA)
            if (action.payload.sleep == null) {
                return state
                
            }
            var newState = [
                    ...state,
                    ...action.payload.sleep
                ]
            return newState
        case CLEAR_DATA:
            console.log(CLEAR_DATA)
            return []
        default: 
            return state
    }
}

export default sleepReducer