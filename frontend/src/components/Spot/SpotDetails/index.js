import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkFetchSingleSpot } from "../../../store/spots";
import './SpotDetails.css'

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch()
    const spot = useSelector((state) => state.spots.singleSpot)

    useEffect(() => {
        dispatch(thunkFetchSingleSpot(spotId))
    }, [dispatch, spotId])

    const reserveSpot = () => {
        alert('Feature coming soon')
    }

    if (!spot) return null;
    if (!spot.Owner) return null;
    if (!spot.SpotImages) return null;

    const { SpotImages } = spot

    return (
        spot && <>
            <div>
                <h2>{spot.name}</h2>
                <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
                <div className="images">
                    {SpotImages && <img key={SpotImages[0].url} href={SpotImages[0].url} alt='PreviewImage' />}
                    <div className="right-side-images">
                        {SpotImages[1] && <img key={SpotImages[1].url} src={SpotImages[1].url} alt={SpotImages[1].url} />}
                        {SpotImages[2] && <img key={SpotImages[2].url} src={SpotImages[2].url} alt={SpotImages[2].url} />}
                        {SpotImages[3] && <img key={SpotImages[3].url} src={SpotImages[3].url} alt={SpotImages[3].url} />}
                        {SpotImages[4] && <img key={SpotImages[0].url} src={SpotImages[4].url} alt={SpotImages[4].url} />}
                    </div>
                </div>
            </div>
            <div>
                <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                <p>{spot.description}</p>
            </div>
            <div>
                <div>
                    <p>${spot.price} night</p>
                    <p><i className="fa-sharp fa-solid fa-star"></i>{spot.avgStarRating} - {spot.numReviews} reviews</p>
                </div>
                <button onClick={reserveSpot}>Reserve</button>
            </div>
        </>
    )
}

export default SpotDetails;
