import {SET_CURRENT_CHILD} from '../actions/index'

var initalSettingState = {
    currentChild: null
}

var settingsReducer = function(state = initalSettingState, action) {
    switch (action.type) {
        case SET_CURRENT_CHILD:
            return Object.assign({}, state, {
                currentChild: action.payload.childID
            })

        default:
            return state
    }
}

export default settingsReducer