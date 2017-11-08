import {
    SLEEP_LOAD_DATA,
    SLEEP_FETCH_DATA,
    CLEAR_DATA
} from '../../actions/index'

var initialState = {byID:{}, allIDs: []}

var sleepReducer = function(state = initialState, action) {
    switch (action.type) {
        case SLEEP_FETCH_DATA:
            console.log(action.type)
            return initialState
        case SLEEP_LOAD_DATA:
            console.log(action.type)
            var newState = initialState
            if (action.payload.sleep) {
                action.payload.sleep.forEach(
                    (e) => {
                        newState.byID[e.id] = e
                        newState.allIDs.push(e.id)
                    }
                )
            }
            return Object.assign(initialState, state, newState)
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default sleepReducer