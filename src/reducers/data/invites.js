import {
    INVITES_UPDATE,
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
            return newState
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default invitesReducer