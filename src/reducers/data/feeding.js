import {
    FEEDING_LOAD_DATA,
    FEEDING_FETCH_DATA,
    CLEAR_DATA
} from '../../actions/index'

var initialState = {byID:{}, allIDs: []}

var feedingReducer = function(state = initialState, action) {
    switch (action.type) {
        case FEEDING_FETCH_DATA:
            console.log(action.type)
            return initialState
        case FEEDING_LOAD_DATA:
            console.log(action.type)
            var newState = initialState
            if (action.payload.feedingData){
                action.payload.feedingData.forEach(
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

export default feedingReducer