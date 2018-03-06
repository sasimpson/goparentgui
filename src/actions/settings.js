import {SET_CURRENT_CHILD, RESET_STATE, CLEAR_DATA} from './index'
import {clearMessages} from 'redux-flash'

export const setCurrentChild = (childID) => {
    return (dispatch) => {
        dispatch({type: SET_CURRENT_CHILD, payload: {"childID": childID}})
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch(clearMessages())
        dispatch({type: CLEAR_DATA})
        dispatch({type: RESET_STATE})
    }
}