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
            console.log(action.type, action.payload)
            var newState = state
            if (action.payload.sleepData) {
                action.payload.sleepData.forEach(
                    (e) => {
                        console.log("sleepdata load each", e)
                        newState.byID[e.id] = e
                        if (!newState.allIDs.includes(e.id)) {
                            newState.allIDs.push(e.id)
                        }
                    }
                )
            }
            console.log("sleep new state", newState)
            return Object.assign(initialState, state, newState)
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default sleepReducer