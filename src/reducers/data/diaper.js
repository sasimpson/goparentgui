import {
    DIAPER_LOAD_DATA,
    DIAPER_ADD_DATA,
    DIAPER_GRAPH_DATA,
    CLEAR_DATA
} from '../../actions/index'

import {uniq} from 'lodash'

var initialState = {
    byID:{}, 
    allIDs: [], 
    graphData: {
        labels: [],
        datasets: {},
        chartReady: false
    }
}

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
            // console.log(action.payload)
            //first get the labels so we can tell how many days we have,
            //we then have to set the length of the data arrays to the number of days total.
            var labels = []
            action.payload.dataset.forEach(e => {
                if (e.type > 0) {
                    labels.push(new Date(e.date).valueOf())
                    // datasets[e.type].data.push(e.count)
                    // datasets[e.type].label = "" + e.type
                }
            })
            labels = uniq(labels)
            labels = labels.filter(date => date > 0)
           
            var datasets = [
                {
                    label: "no 1",
                    data: new Array(labels.length).fill(0),
                    backgroundColor: "rgba(192,192,255,.2)"
                },
                {
                    label: "no 2",
                    data: new Array(labels.length).fill(0),
                    backgroundColor: "rgba(255,192,192,.2)"
                },
                {
                    label: "both",
                    data: new Array(labels.length).fill(0),
                    backgroundColor: "rgba(100,155,100,.2)"
                },
            ]
            //now go through each dataset item in the payload, figure out what its index is
            // in the labels so we can insert that into the array of data points
            action.payload.dataset.forEach(e => {
                if (e.type > 0) {
                    var idx = labels.indexOf(new Date(e.date).valueOf())
                    datasets[e.type-1].data[idx] = e.count
                }
            })
            // datasets = forEach(datasets, x => { return x })

            //reset dates on labels
            labels = labels.map(x => {
                return new Date(x).toDateString()
            })
            //assign data so we can set in state
            var data = {
                labels: labels,
                datasets: datasets,
                chartReady: true
            }
            console.log("data:", data)
            return {
                ...state, graphData: data
            }
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default diaperReducer