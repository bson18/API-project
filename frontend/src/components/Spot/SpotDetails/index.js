import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkFetchSingleSpot } from "../../../store/spots";
import './SpotDetails.css'
import SpotReviews from "../../Review/SpotReviews";

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

    const reviewsDisplay = () => {
        if (spot.numReviews === 0) {
            return <p><i className="fa-sharp fa-solid fa-star"></i>New</p>
        } else if (spot.numReviews === 1) {
            return <p><i className="fa-sharp fa-solid fa-star"></i>{spot.avgStarRating.toFixed(1)} &bull; {spot.numReviews + ' review'}</p>
        } else {
            return <p><i className="fa-sharp fa-solid fa-star"></i>{spot.avgStarRating.toFixed(1)} &bull; {spot.numReviews + ' reviews'}</p>
        }
    }

    if (!spot) return null;
    if (!spot.Owner) return null;
    if (!spot.SpotImages) return null;

    const { SpotImages } = spot

    return (
        spot && <div className="spot-details-container">
            <div>
                <h2>{spot.name}</h2>
                <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
                <div className="images">
                    {SpotImages && <img className="preview" key={SpotImages[0].url} src={SpotImages[0].url} alt='PreviewImage' />}
                    <div className="right-side-images">
                        {SpotImages[1] && <img className="right-side-image" key={SpotImages[1].url} src={SpotImages[1].url} alt={SpotImages[1].url} />}
                        {SpotImages[2] && <img className="right-side-image" key={SpotImages[2].url} src={SpotImages[2].url} alt={SpotImages[2].url} />}
                        {SpotImages[3] && <img className="right-side-image" key={SpotImages[3].url} src={SpotImages[3].url} alt={SpotImages[3].url} />}
                        {SpotImages[4] && <img className="right-side-image" key={SpotImages[0].url} src={SpotImages[4].url} alt={SpotImages[4].url} />}
                    </div>
                </div>
            </div>
            <div className="info-container">
                <div className="name-description">
                    <p id="name">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                    <p>{spot.description}</p>
                </div>
                <div id="reserve-box">
                    <div id="price-review">
                        <p id='price'><span>${spot.price}</span> night</p>
                        <span id='review'>{reviewsDisplay()}</span>
                    </div>
                    <button id='reserve-btn' onClick={reserveSpot}>Reserve</button>
                </div>
            </div>
            <hr />
            <div>
                {reviewsDisplay()}
            </div>
            <div>
                <SpotReviews spot={spot} />
            </div>
        </div>
    )
}

export default SpotDetails;
