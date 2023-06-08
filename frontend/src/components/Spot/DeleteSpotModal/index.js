import { useDispatch } from "react-redux"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { thunkDeleteSpot } from "../../../store/spots"

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
        <>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <div>
                <button onClick={onClick}>Yes (Delete Spot)</button>
                <button onClick={closeModal}>No (KeepSpot)</button>
            </div>
        </>
    )
}

export default DeleteSpotModal
