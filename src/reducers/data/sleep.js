import {
    SLEEP_LOAD_DATA,
    SLEEP_FETCH_DATA,
    SLEEP_ADD_DATA,
    CLEAR_DATA,
    SLEEP_GRAPH_DATA
} from '../../actions/index'
import {colors} from '../../utils/index'

var initialState = {byID:{}, allIDs: []}

var sleepReducer = function(state = initialState, action) {
    switch (action.type) {
        case SLEEP_FETCH_DATA:
            return state
        case SLEEP_LOAD_DATA:
            var byID = {}
            var allIDs = []
            action.payload.sleepData.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            return {...state, byID: byID, allIDs: allIDs}
        case SLEEP_ADD_DATA:
            return {
                ...state, 
                byID:  {...state.byID, [action.payload.id]: action.payload}, 
                allIDs: state.allIDs.includes(action.payload.id) ? [...state.allIDs] : [...state.allIDs, action.payload.id]
            }
        case SLEEP_GRAPH_DATA:
            console.log("payload", action.payload)
            var days = []
            var maxLength = 0
            var dayStruct = {}
            action.payload.dataset.forEach(e => {
                var day = new Date(e.date).toDateString()
                days.push(day)
                dayStruct[day] = e.total
                if (e.total.length != null && e.total.length > maxLength) {
                    maxLength = e.total.length
                }
            })

            var datasets = []
            //rotates the matrix 90degrees, need to figure out a better way
            for (var i = 0; i < maxLength; i++) {
                
                var foo = days.map(d => {
                    if (dayStruct[d].length >= maxLength) {
                        return dayStruct[d][i]/6e10
                    } else {
                        return 0
                    }
                })
                datasets.push({
                    label: i, 
                    data: foo,
                    backgroundColor: colors[i]
                })
            }


            var data = {
                labels: days,
                datasets: datasets
            }
            console.log("dataset", datasets)
            return {
                ...state, graphData: data
            }
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default sleepReducer