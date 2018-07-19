import {
    DIAPER_LOAD_DATA,
    DIAPER_ADD_DATA,
    DIAPER_GRAPH_DATA,
    CLEAR_DATA
} from '../../actions/index'

import {uniq} from 'lodash'

var initialState = {byID:{}, allIDs: [], graphData: []}

var diaperReducer = function(state = initialState, action) {
    switch (action.type) {
        case DIAPER_LOAD_DATA:
            var byID = {}
            var allIDs = []
            action.payload.wasteData.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            return {...state, byID: byID, allIDs: allIDs}
        case DIAPER_ADD_DATA:
            return {
                ...state, 
                byID:  {...state.byID, [action.payload.id]: action.payload}, 
                allIDs: state.allIDs.includes(action.payload.id) ? [...state.allIDs] : [...state.allIDs, action.payload.id]
            }
        case DIAPER_GRAPH_DATA:
            console.log(action.payload)
            var labels = []
            
            action.payload.dataset.forEach(e => {
                var recordDate = new Date(e.date)
                labels.push(recordDate.valueOf())
            })
            labels = uniq(labels)
            labels = labels.filter(date => date > 0)
            labels = labels.map(x => {
                return new Date(x)
            })
            console.log(labels)
            return {
                ...state
            }
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default diaperReducer