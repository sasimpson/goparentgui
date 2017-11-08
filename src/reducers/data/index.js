import childrenReducer from './children'
import sleepReducer from './sleep'
import diaperReducer from './diaper'
import feedingReducer from './feeding'

var dataStateTree = { 
    children : {
        byID: {},
        allIDs: []
    },
    sleep : {
        byID: {},
        allIDs: []
    },
    diaper : {
        byID: {},
        allIDs: []
    },
    feeding : {
        byID: {},
        allIDs: []
    }
}

var dataReducer = function(state = dataStateTree, action) {
    return {
        children: childrenReducer(state.children, action),
        sleep: sleepReducer(state.sleep, action),
        diaper: diaperReducer(state.diaper, action),
        feeding: feedingReducer(state.feeding, action)
    }
}

export default dataReducer