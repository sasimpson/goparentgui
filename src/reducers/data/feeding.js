import {
    FEEDING_LOAD_DATA,
    FEEDING_ADD_DATA,
    FEEDING_WILL_POST,
    CLEAR_DATA,
    FEEDING_GRAPH_DATA,
} from '../../actions/index'

import {uniq} from 'lodash'

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
            var labels = []
            action.payload.dataset.forEach(e => {
                labels.push(new Date(e.date).valueOf())
            })
            labels = uniq(labels)

            var datasets = {
                "bottle":[
                    {
                        label: "bottle fl oz",
                        data: new Array(labels.length).fill(0),
                        backgroundColor: window.chartColors.blue,
                        type: "bar",
                        yAxisID: "y-axis-1"
                    },
                    {
                        label: "bottle feedings",
                        data: new Array(labels.length).fill(0),
                        backgroundColor:  window.chartColors.red,
                        type: "line",
                        fill: false,
                        yAxisID: "y-axis-2"
                    },
                ],
                "breast": [
                    {
                        label: "breast time (min)",
                        data: new Array(labels.length).fill(0),
                        backgroundColor: "rgba(192,255,192,.2)",
                        type: "bar",
                        yAxisID: "y-axis-1"
                    },
                    {
                        label: "breast feedings",
                        data: new Array(labels.length).fill(0),
                        backgroundColor: "rgba(192,255,192,.2)",
                        type: "line",
                        yAxisID: "y-axis-2"
                    }
                ]
            }
            action.payload.dataset.forEach(e => {
                var idx
                switch (e.type) {
                    case "bottle":
                        idx = labels.indexOf(new Date(e.date).valueOf())
                        datasets["bottle"][0].data[idx] = e.sum
                        datasets["bottle"][1].data[idx] = e.count
                        break;
                    case "breast": 
                        idx = labels.indexOf(new Date(e.date).valueOf())
                        datasets["breast"][0].data[idx] = e.sum
                        datasets["breast"][1].data[idx] = e.count
                        break;
                    default:
                }   
            })
            labels = labels.map(x => {
                return new Date(x).toDateString()
            })
            var data = {
                labels: labels,
                datasets: datasets,
                chartReady: true
            }
            return {...state, graphData: data}
        case CLEAR_DATA:
            return initialState
        default:
            return state
    }
}

export default feedingReducer