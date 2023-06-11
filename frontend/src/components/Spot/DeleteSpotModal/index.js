import { useDispatch } from "react-redux"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { thunkDeleteSpot } from "../../../store/spots"
import './DeleteSpotModal.css'

const DeleteSpotModal = ({ spotId }) => {
    const dispatch = useDispatch()
    // const history = useHistory()
    const { closeModal } = useModal()

    const onClick = e => {
        e.preventDefault()
        dispatch(thunkDeleteSpot(spotId))
            .then(closeModal)
    }

    return (
        <div className="confirm-modal">
            <h2 className="delete-head">Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <div className="button-container">
                <button className="confirm-button" onClick={onClick}>Yes (Delete Spot)</button>
                <button className="reject-button" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSpotModal
