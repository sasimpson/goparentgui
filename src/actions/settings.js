import {SET_CURRENT_CHILD} from './index'

export const setCurrentChild = (childID) => {
    return (dispatch) => {
        dispatch({type: SET_CURRENT_CHILD, payload: {"childID": childID}})
    }
}