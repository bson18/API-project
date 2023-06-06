import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'

//get all spots
export const actionGetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}




export const thunkFetchSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    const resBody = await res.json()
    if (res.ok) {
        dispatch(actionGetAllSpots(resBody['Spots']))
        return resBody
    }
}




export default function spotsReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            return { ...state, allSpots: action.spots }
        }

        default:
            return state
    }
}
