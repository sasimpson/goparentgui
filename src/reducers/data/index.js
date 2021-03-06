import childrenReducer from './children'
import sleepReducer from './sleep'
import diaperReducer from './diaper'
import feedingReducer from './feeding'
import statisticsReducer from './statistics'
import invitesReducer from './invites'

var dataStateTree = { 
    children : {
        byID: {},
        allIDs: []
    },
    sleep : {
        byID: {},
        allIDs: [],
        graphData: {
            datasets: {},
            labels: [],
            chartReady: false
        },
        sleepStatus: false
    },
    diaper : {
        byID: {},
        allIDs: [],
        graphData: {
            data: [],
            options: {},
            chartReady: false
        }
    },
    feeding : {
        inProgress: false,
        byID: {},
        allIDs: [],
        graphData: {
            data: [],
            options: {},
            chartReady: false
        }
    },
    statistics: {
        byID: {},
        allIDs: []
    },
    invites :{
        sent: {
            byID: {},
            allIDs: []
        },
        pending: {
            byID: {},
            allIDs: []
        }
    }
}

var dataReducer = function(state = dataStateTree, action) {
    return {
        children: childrenReducer(state.children, action),
        sleep: sleepReducer(state.sleep, action),
        diaper: diaperReducer(state.diaper, action),
        feeding: feedingReducer(state.feeding, action),
        statistics: statisticsReducer(state.statistics, action),
        invites: invitesReducer(state.invites, action)
    }
}

export default dataReducer