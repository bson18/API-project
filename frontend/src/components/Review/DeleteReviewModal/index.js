import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { thunkDeleteReview, thunkGetSpotReviews } from "../../../store/reviews"
import { thunkFetchSingleSpot } from "../../../store/spots"
import './DeleteReviewModal.css'

const DeleteReviewModal = ({ spot, review }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(thunkDeleteReview(review.id))
            .then(dispatch(thunkFetchSingleSpot(spot.id)))
            .then(dispatch(thunkGetSpotReviews(spot.id)))
            .then(closeModal)
    }

    return (
        <div className="confirm-modal">
            <h2 className="delete-head">Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="button-container">
                <button className="confirm-button" onClick={onSubmit}>Yes (Delete Review)</button>
                <button className="reject-button" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
