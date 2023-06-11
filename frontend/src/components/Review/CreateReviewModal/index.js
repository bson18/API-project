import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { thunkCreateReview, thunkGetSpotReviews } from "../../../store/reviews"
import StarRating from "./StarRating"
import './CreateReviewModal.css'
import { thunkFetchSingleSpot } from "../../../store/spots"

const CreateReviewModal = ({ spot, user }) => {
    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [validationErrors, setValidationErrors] = useState({})
    const { closeModal } = useModal()
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = {}

        if (review.length < 10) errors.review = 'Reviews need a minimum of 10 characters'
        if (stars < 1) errors.stars = 'Must choose a star rating between 1 and 5'
        setValidationErrors(errors)
    }, [review, stars])

    const onSubmit = async e => {
        e.preventDefault()
        setHasSubmitted(true)

        const createReview = { userId: user.id, review, stars }

        const createdReview = await dispatch(thunkCreateReview(createReview, spot.id))

        if (createdReview.message) {
            setValidationErrors(createdReview)
            return
        } else {
            dispatch(thunkGetSpotReviews(spot.id))
                .then(dispatch(thunkFetchSingleSpot(spot.id)))
                .then(closeModal())
        }
    }

    const onChange = stars => setStars(parseInt(stars))

    if (!user) return null

    return (
        <>
            <div className="modal-create-review">
                <h2 id='head'>How was your stay?</h2>
                <div className="error"> {hasSubmitted && validationErrors.review && `${validationErrors.review}`}</div>
                <div className="error"> {hasSubmitted && validationErrors.stars && `${validationErrors.stars}`}</div>
                <div className="error"> {hasSubmitted && validationErrors.message && `${validationErrors.message}`}</div>
                <textarea
                    id="review-text"
                    value={review}
                    type='text'
                    placeholder="Just a quick review."
                    onChange={e => setReview(e.target.value)}
                />
                <div className="star-rating">
                    <StarRating
                        stars={stars}
                        disabled={false}
                        onChange={onChange}
                    />
                </div>
                <button
                    onClick={onSubmit}
                    disabled={Object.values(validationErrors).length > 0}
                    id={Object.values(validationErrors).length > 0 ? 'submit-button-disabled' : 'submit-button-active'}>Submit Your Review</button>
            </div>
        </>
    )
}

export default CreateReviewModal
