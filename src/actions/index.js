//authentication
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

//registration
export const REGISTRATION_SUBMITTED = 'REGISTRATION_SUBMITTED'
export const REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL'
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR'

//children
export const SET_CURRENT_CHILD = 'SET_CURRENT_CHILD'    
export const CHILDREN_LOAD_DATA = 'CHILDREN_LOAD_DATA'  
export const CHILDREN_WILL_POST = 'CHILDREN_WILL_POST'  
export const CHILDREN_ADD_DATA = 'CHILDREN_ADD_DATA'   
export const CHILDREN_DELETE_DATA = 'CHILDREN_DELETE_DATA'

//feeding 
export const FEEDING_LOAD_DATA = 'FEEDING_LOAD_DATA' //success
export const FEEDING_LOADING_DATA = 'FEEDING_LOADING_DATA' //in progress
export const FEEDING_LOAD_FAILED = 'FEEDING_LOAD_FAILED' //failed
export const FEEDING_ADD_DATA = 'FEEDING_ADD_DATA'
export const FEEDING_WILL_POST = 'FEEDING_WILL_POST'

//sleep
export const SLEEP_FETCH_DATA = 'SLEEP_FETCH_DATA'
export const SLEEP_LOAD_DATA = 'SLEEP_LOAD_DATA'
export const SLEEP_ADD_DATA = 'SLEEP_ADD_DATA'

//diaper
export const DIAPER_LOAD_DATA = 'DIAPER_LOAD_DATA'
export const DIAPER_ADD_DATA = 'DIAPER_ADD_DATA'
export const DIAPER_GRAPH_DATA = 'DIAPER_GRAPH_DATA'

//statistics
export const STATISTICS_LOAD = 'STATISTICS_LOAD'

//user
export const SENT_INVITES_UPDATE = 'SENT_INVITES_UPDATE'
export const SENT_INVITES_WILL_POST = 'SENT_INVITES_WILL_POST'
export const SENT_INVITE_WILL_DELETE = 'SENT_INVITE_WILL_DELETE'
export const SENT_INVITE_DID_DELETE = 'SENT_INVITE_DID_DELETE'
export const PENDING_INVITES_UPDATE = 'PENDING_INVITES_UPDATE'
export const PENDING_INVITE_PENDING_ACCEPT = 'PENDING_INVITE_PENDING_ACCEPT'
export const PENDING_INVITE_ACCEPTED = 'PENDING_INVITE_ACCEPTED'

//misc
export const CLEAR_DATA = 'CLEAR_DATA'
export const RESET_STATE = 'RESET_STATE'