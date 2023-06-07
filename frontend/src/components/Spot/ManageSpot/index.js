import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkFetchSpots } from "../../../store/spots"
import { useHistory } from "react-router-dom"
import './ManageSpot.css'

const ManageSpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const spots = useSelector(state => state.spots.allSpots)
    const owner = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkFetchSpots())
    }, [dispatch])

    // console.log('first spots clg', spots)
    if (!spots) return null
    const userSpots = spots.filter(spot => {
        return spot.ownerId === owner.id
    })
    // console.log(userSpots)

    if (!userSpots.length) {
        return (
            <>
                <div>
                    <h2>Manage Your Spots</h2>
                    <button onClick={e => history.push('/spots/new')}>Create a New Spot</button>
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <h2>Manage Your Spots</h2>
                <button onClick={() => history.push('/spots/new')}>Create a New Spot</button>
            </div>
            <div className="spot-tiles">
                {userSpots.map(spot => (
                    <div className="spot-tile" key={spot.id} onClick={() => history.push(`/spots/${spot.id}`)}>
                        {(spot.previewImage === 'There is no preview image') ?
                            <div style={{ width: 250, height: 250, border: 'solid black 1px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
                            : <img src={spot.previewImage} alt="Spot Preview" />}
                        <div className="location-rating">
                            <p>{spot.city}, {spot.state}</p>
                            <p><i className="fa-sharp fa-solid fa-star"></i>{spot.avgRating || 'New'}</p>
                        </div>
                        <p>${spot.price} night</p>
                        <div>
                            <button onClick={e => {
                                e.stopPropagation()
                                history.push(`/spots/${spot.id}/edit`)
                            }}>Update</button> {' '}
                            <button>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ManageSpot
