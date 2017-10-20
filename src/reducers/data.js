import childrenReducer from './children'
import sleepReducer from './sleep'

var dataReducer = function(state = {}, action) {
    return {
        children: childrenReducer(state.children, action),
        sleep: sleepReducer(state.sleep, action)
    }
}

export default dataReducer