import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

/*-----ACTIONS-----*/

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

//create spot
export const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

//update spot
export const actionUpdateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

//delete spot
export const actionDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

/*-----THUNKS-----*/

//fetch all spots
export const thunkFetchSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    const data = await res.json()
    if (res.ok) {
        dispatch(actionGetAllSpots(data['Spots']))
        return data
    }
}

//fetch single spot
export const thunkFetchSingleSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    const spot = await res.json()
    if (res.ok) {
        dispatch(actionGetSingleSpot(spot))
        return spot
    }
}

//create spot
export const thunkCreateSpot = (spot, images) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const data = await res.json()
        let spotImages = []
        for (let img of images) {
            images.spotId = data.id

            const imgResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(img)
            })

            if (imgResponse.ok) {
                const createdImage = await imgResponse.json()
                spotImages.push(createdImage)
            }
        }
        data.SpotImages = spotImages

        await dispatch(actionCreateSpot(data))
        return data
    }
}

//update spot
export const thunkUpdateSpot = (spot) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionUpdateSpot(data))
        return data
    }
}

//delete spot
export const thunkDeleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    if (res.ok) dispatch(actionDeleteSpot(spotId))
    return data
}


/*-----REDUCER-----*/

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
        case CREATE_SPOT: {
            const spot = action.spot
            newState = { ...state, allSpots: {}, singleSpot: { ...spot } }
            newState.singleSpot[spot.id] = spot
            return newState
        }
        case UPDATE_SPOT: {
            newState = { ...state, [action.spot.id]: action.spot }
            return newState
        }
        case DELETE_SPOT: {
            const spotId = action.spotId
            newState = { ...state, allSpots: state.allSpots.filter(spot => spot.id !== spotId) }
            return newState
        }

        default:
            return state
    }
}
