import "./SpotTile.css"

const SpotTile = ({ spot }) => {
    const rating = spot.avgRating || 'New'

    const img = (spot.previewImage === 'There is no preview image') ?
        <div style={{ width: 250, height: 250, border: 'solid black 1px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
        : <img src={spot.previewImage} alt="Spot Preview" />


    return (
        <>
            <div className="spot-tile">
                {img}
                <div className="location-rating">
                    <p>{spot.city}, {spot.state}</p>
                    <p><i className="fa-sharp fa-solid fa-star"></i>{rating}</p>
                </div>
                <p>${spot.price} night</p>
            </div>
        </>
    )
}

export default SpotTile;
