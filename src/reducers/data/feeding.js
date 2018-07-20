import {
    FEEDING_LOAD_DATA,
    FEEDING_ADD_DATA,
    FEEDING_WILL_POST,
    CLEAR_DATA,
    FEEDING_GRAPH_DATA,
} from '../../actions/index'

var initialState = {
    byID:{}, 
    allIDs: [],
    graphData: {
        data: [],
        options: {},
        chartReady: false
    }
}

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
            return {
                ...state, 
                byID:  {...state.byID, [action.payload.id]: action.payload}, 
                allIDs: state.allIDs.includes(action.payload.id) ? [...state.allIDs] : [...state.allIDs, action.payload.id]
            }
        case FEEDING_GRAPH_DATA:
            return {...state}
        case CLEAR_DATA:
            return initialState
        default:
            return state
    }
}

export default feedingReducer