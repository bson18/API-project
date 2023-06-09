import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'

/*-----ACTIONS-----*/

//get reviews
export const actionGetSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

//create review
export const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
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

//create review
export const thunkCreateReview = (review, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreateReview(data))
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
        case CREATE_REVIEW: {
            newState = { ...state, [action.review.id]: action.review }
            return newState
        }

        default:
            return state
    }
}
