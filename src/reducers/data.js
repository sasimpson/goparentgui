import childrenReducer from './children'
import sleepReducer from './sleep'
import diaperReducer from './diaper'

var dataReducer = function(state = {}, action) {
    return {
        children: childrenReducer(state.children, action),
        sleep: sleepReducer(state.sleep, action),
        diaper: diaperReducer(state.diaper, action)
    }
}

export default dataReducer