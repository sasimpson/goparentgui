import {
    INVITES_UPDATE,
    INVITE_DID_DELETE,
    CLEAR_DATA
} from '../../actions/index'
import {omit} from 'lodash'

var initialState = {byID:{}, allIDs: []}

var invitesReducer = function(state = initialState, action) {
    switch (action.type) {
        case INVITES_UPDATE:
            var byID = {}
            var allIDs = []
            action.payload.inviteData.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            return {...state, allIDs: allIDs, byID: byID}
        case INVITE_DID_DELETE:
            return {
                ...state, 
                allIDs: state.allIDs.filter( id => id !== action.payload.id),
                byID: omit(state.byID, action.payload.id)
            }
        case CLEAR_DATA:
            return initialState
        default: 
            return state
    }
}

export default invitesReducer