import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'
const CREATE_SPOT = 'spots/CREATE_SPOT'
// const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE'

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

//add spot image
// export const actionAddSpotImage = (spotImages) => {
//     return {
//         type: ADD_SPOT_IMAGE,
//         spotImages
//     }
// }

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

        default:
            return state
    }
}
