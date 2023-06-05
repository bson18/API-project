const spotTile = ({ previewImage, location, price, avgRating }) => {
    const rating = avgRating || 'New'

    return (
        <>
            <div className="spot-tile">
                {previewImage}
                <div className="location-rating">
                    <p>{location}</p>
                    <p>{rating}</p>
                </div>
                <p>${price} night</p>
            </div>
        </>
    )
}

export default spotTile;
