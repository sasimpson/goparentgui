import { STATISTICS_LOAD } from "./index";

import {getUrl} from '../utils/index'


const childrenUpdateStats = (data) => {
    return {type: STATISTICS_LOAD, payload: data }
}

export const getStats = (token, childID) => {
    return (dispatch) => {
        return fetch(getUrl("/api/children/" + childID + "/summary"), {
            method: "GET", 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => dispatch(childrenUpdateStats(data)))
            .catch(e => console.log(e))
    }
}