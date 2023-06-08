import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'

/*-----ACTIONS-----*/

//get reviews
export const actionGetSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

/*-----THUNKS-----*/

//get reviews
export const thunkGetSpotReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetSpotReviews(data))
        return data
    }
}

/*-----REDUCER-----*/

const initialState = {}

export default function reviewsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            newState = { ...state, reviews: action.reviews }
            return newState
        }

        default:
            return state
    }
}
