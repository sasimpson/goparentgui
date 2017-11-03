import {FEEDING_LOAD_DATA,CLEAR_DATA} from '../actions/index'

var feedingReducer = function(state = [], action) {
    switch (action.type) {
        case FEEDING_LOAD_DATA:
            console.log(FEEDING_LOAD_DATA)
            console.log(action)
            if (action.payload.feedingData == null){
                return state
            }
            var newState = [
                ...action.payload.feedingData
            ]
            return newState
        case CLEAR_DATA:
            console.log(CLEAR_DATA)
            return []
        default:
            return state
    }
}

export default feedingReducer