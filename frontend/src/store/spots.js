import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'

//get all spots
export const actionGetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

//get single spot
export const actionGetSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    }
}


export const thunkFetchSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    const data = await res.json()
    if (res.ok) {
        dispatch(actionGetAllSpots(data['Spots']))
        return data
    }
}

export const thunkFetchSingleSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    const spot = await res.json()
    if (res.ok) {
        dispatch(actionGetSingleSpot(spot))
        return spot
    }
}

const initialState = {
    allSpots: null,
    singleSpot: {}
}
export default function spotsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_SPOTS: {
            newState = { allSpots: {}, ...state.singleSpot }
            newState.allSpots = action.spots
            return newState
        }
        case GET_SINGLE_SPOT: {
            newState = { ...state.allSpots, singleSpot: {} }
            newState.singleSpot = action.spot
            return newState
        }

        default:
            return state
    }
}
