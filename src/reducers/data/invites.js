import {
    SENT_INVITES_UPDATE,
    PENDING_INVITES_UPDATE,
    SENT_INVITE_DID_DELETE,
    CLEAR_DATA,
    PENDING_INVITE_ACCEPTED
} from '../../actions/index'
import {omit} from 'lodash'

var initialState = {
    sent: {
        byID:{}, 
        allIDs: []
    },
    pending: {
        byID: {},
        allIDs: []
    }
}

var sentInvitesReducer = function(state = initialState.sent, action) {
    switch (action.type) {
        case SENT_INVITES_UPDATE:
            var byID = {}
            var allIDs = []
            action.payload.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            return {...state, allIDs: allIDs, byID: byID}
        case SENT_INVITE_DID_DELETE:
            return {
                ...state, 
                allIDs: state.allIDs.filter( id => id !== action.payload.id),
                byID: omit(state.byID, action.payload.id)
            }
        case CLEAR_DATA:
            return initialState.sent
        default: 
            return state
    }
}

var pendingInvitesReducer = function(state = initialState.pending, action) {
    switch (action.type) {

        case PENDING_INVITES_UPDATE:
            var byID = {}
            var allIDs = []
            action.payload.forEach( e => {
                byID[e.id] = e
                allIDs.push(e.id)
            })
            return {...state.pending, allIDs: allIDs, byID: byID}
        case PENDING_INVITE_ACCEPTED:
            return {
                ...state, 
                allIDs: state.allIDs.filter( id => id !== action.payload.id),
                byID: omit(state.byID, action.payload.id)
            }
        case CLEAR_DATA:
            return initialState.pending
        default: 
            return state
    }
}

var invitesReducer = function(state = initialState, action) {
    return {
        sent: sentInvitesReducer(state.sent, action),
        pending: pendingInvitesReducer(state.pending, action)
    }
}

export default invitesReducer