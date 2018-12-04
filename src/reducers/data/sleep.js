import {
    SLEEP_LOAD_DATA,
    SLEEP_FETCH_DATA,
    SLEEP_ADD_DATA,
    CLEAR_DATA,
    SLEEP_GRAPH_DATA,
    SLEEP_STATUS
} from '../../actions/index'
import {colors} from '../../utils/index'

var initialState = {
    byID:{}, 
    allIDs: [], 
    graphData: {
        datasets: {},
        labels: [],
        chartReady: false
    },
    sleepStatus: false
}

var sleepReducer = function(state = initialState, action) {
    switch (action.type) {
        case SLEEP_LOAD_DATA:
            var byID = {}
            var allIDs = []
            action.payload.sleepData.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            var graphData = {}
            var newState = {...state, byID: byID, allIDs: allIDs, graphData: graphData}
            console.log("sleeploaddata newstate", newState)
            return newState
        case SLEEP_ADD_DATA:
            newState = {
                ...state, 
                byID:  {...state.byID, [action.payload.id]: action.payload}, 
                allIDs: state.allIDs.includes(action.payload.id) ? [...state.allIDs] : [...state.allIDs, action.payload.id]
            }
            console.log("sleepadddata newstate", newState)
            return newState
        case SLEEP_GRAPH_DATA:
            // console.log("SLEEP_GRAPH_DATA payload", action.payload)
            var days = []
            var maxLength = 0
            var dayStruct = {}
            //get the day labels and determine max width of matrix
            action.payload.dataset.forEach(e => {
                var day = new Date(e.date).toDateString()
                days.push(day)
                dayStruct[day] = e.total
                if (e.total.length != null && e.total.length > maxLength) {
                    maxLength = e.total.length
                }
            })

            var rotateData = function(d) {
                if (dayStruct[d].length >= maxLength) {
                    return dayStruct[d][i]/6e10
                } else {
                    return 0
                }
            }

            var datasets = []
            //rotates the matrix 90degrees, need to figure out a better way
            for (var i = 0; i < maxLength; i++) {
                var foo = days.map(rotateData)
                datasets.push({
                    label: i, 
                    data: foo,
                    backgroundColor: colors[i]
                })
            }

            newState = {
                ...state, graphData: {
                    labels: days,
                    datasets: datasets
                }
            }
            console.log("sleepgraphdata newState", newState)
            return newState
        case SLEEP_STATUS: 
            console.log("set Sleep Status", action)
            newState = {
                ...state, sleepStatus: action.payload
            }
            console.log("sleepstatus newstate", newState)
            return newState
        case CLEAR_DATA:
            return initialState
        case SLEEP_FETCH_DATA:
            newState = {...state}
            console.log("sleepfetchdata newstate", newState)
            return newState
        default: 
            return {...state}
    }
}


export default sleepReducer