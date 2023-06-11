import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./SpotTile.css"

const SpotTile = ({ spot }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`/spots/${spot.id}`)
    }
    const rating = parseFloat(spot.avgRating).toFixed(1) || 'New'

    const img = (spot.previewImage === 'There is no preview image') ?
        <div></div>
        : <img src={spot.previewImage} alt="Spot Preview" className="spot-image" />


    return (
        <>
            <div className="spot-tile" onClick={onClick} title={spot.name}>
                {img}
                <div className="location-rating">
                    <p>{spot.city}, {spot.state}</p>
                    <p><i className="fa-sharp fa-solid fa-star"></i>{rating}</p>
                </div>
                <p className="price"><span>${spot.price}</span> night</p>
            </div>
        </>
    )
}

export default SpotTile;
