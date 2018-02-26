import {
    INVITES_UPDATE,
    INVITE_DID_DELETE,
    CLEAR_DATA
} from '../../actions/index'

var initialState = {byID:{}, allIDs: []}

var invitesReducer = function(state = initialState, action) {
    switch (action.type) {
        case INVITES_UPDATE:
            var newState = state
            if (action.payload.inviteData) {
                action.payload.inviteData.forEach( (e) => {
                    newState.byID[e.id] = e
                    if (!newState.allIDs.includes(e.id)) {
                        newState.allIDs.push(e.id)
                    }
                });
                
            }
            return Object.assign(initialState, state, newState)
        case INVITE_DID_DELETE:
            newState = state
            if (newState.allIDs.includes(action.payload.id)) {
                var index = newState.allIDs.indexOf(action.payload.id)
                console.log("index", index)
                if (index > -1) {
                    newState.allIDs.splice(index, 1)
                    delete newState.byID[action.payload.id]
                }
            }
            return newState
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default invitesReducer