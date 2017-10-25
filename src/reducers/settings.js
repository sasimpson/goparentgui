import {SET_CURRENT_CHILD, CLEAR_DATA} from '../actions/index'

var initalSettingState = {
    currentChild: null
}

var settingsReducer = function(state = initalSettingState, action) {
    switch (action.type) {
        case SET_CURRENT_CHILD:
            console.log(SET_CURRENT_CHILD)
            console.log(action)
            return Object.assign({}, state, {
                currentChild: action.payload.childID
            })
        case CLEAR_DATA:
            return initalSettingState
        default:
            return state
    }
}

export default settingsReducer