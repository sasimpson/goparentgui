import {SET_CURRENT_CHILD} from './index'

export const setCurrentChild = (childID) => {
    console.log("setCurrentChild")
    return (dispatch) => {
        dispatch({type: SET_CURRENT_CHILD, payload: {"childID": childID}})
    }
}