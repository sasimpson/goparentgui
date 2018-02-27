import {
    FEEDING_LOAD_DATA,
    FEEDING_ADD_DATA,
    FEEDING_WILL_POST,
    CLEAR_DATA,
} from '../../actions/index'

import {addItemToStateEntity} from '../../utils/'

var initialState = {byID:{}, allIDs: []}

var feedingReducer = function(state = initialState, action) {
    switch (action.type) {
        case FEEDING_WILL_POST:
            return state
        case FEEDING_LOAD_DATA:
            var byID = {}
            var allIDs = []
            action.payload.feedingData.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            return {...state, byID: byID, allIDs: allIDs}
        case FEEDING_ADD_DATA:
            return addItemToStateEntity(state, action.payload)
        case CLEAR_DATA:
            return initialState
        default:
            return state
    }
}

export default feedingReducer