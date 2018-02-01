
import config from "../config"

export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch(e) {
        console.log(e)
    }
}

export const getUrl = (path) => {
    if (process.env.NODE_ENV === "production") {
        return config['production']['protocol'] + "://" + config['production']['host'] + ":" + config['production']['port'] + path
    } else if (process.env.NODE_ENV === "development") {
        return config['development']['protocol'] + "://" + config['development']['host'] + ":" + config['development']['port'] + path
    } else {
        return config['default']['protocol'] + "://" + config['default']['host'] + ":" + config['default']['port'] + path
    }
}

export const addItemToStateEntity = (state, payload) => {
    var newState = state
    if (!newState.allIDs.includes(payload.id)) {
        newState.allIDs.push(payload.id)
        newState.byID[payload.id] = payload
    }
    return newState
}

export const setInProgressState = (state, status) => {
    var newState = state
    newState.inProgress = status
    return newState
}