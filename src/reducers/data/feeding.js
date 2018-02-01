import {
    FEEDING_LOAD_DATA,
    FEEDING_LOADING_DATA,
    FEEDING_LOAD_FAILED,
    FEEDING_ADD_DATA,
    FEEDING_WILL_POST,
    CLEAR_DATA,
} from '../../actions/index'

import {addItemToStateEntity, setInProgressState} from '../../utils/'

var initialState = {inProgress: false, byID:{}, allIDs: []}

var feedingReducer = function(state = initialState, action) {
    switch (action.type) {
        case FEEDING_WILL_POST:
            return state
        case FEEDING_LOADING_DATA:
            return Object.assign(initialState, state, setInProgressState(state, true))
        case FEEDING_LOAD_DATA:
            var newState = state
            if (action.payload.feedingData){
                action.payload.feedingData.forEach(
                    (e) => {
                        newState.byID[e.id] = e
                        if (!newState.allIDs.includes(e.id)) {
                            newState.allIDs.push(e.id)
                        }
                    }
                )
            }
            return Object.assign(initialState, state, setInProgressState(newState, false))
        case FEEDING_LOAD_FAILED:
            return Object.assign(initialState, state, setInProgressState(state, false))
        case FEEDING_ADD_DATA:
            return addItemToStateEntity(state, action.payload)
        case CLEAR_DATA:
            return initialState
        default:
            return state
    }
}

export default feedingReducer