import { useEffect, useState } from "react";
import SpotTile from "../SpotTile";
import { csrfFetch } from "../../../store/csrf";
import './SpotTiles.css'

const SpotTiles = () => {
    const [spots, setSpots] = useState([])

    useEffect(() => {
        const query = async () => {
            const res = await csrfFetch("/api/spots")
            const data = await res.json()

            if (data && data.Spots) {
                setSpots(data.Spots)
            }
        }
        query()
    }, [])

    return (
        <div className="spot-tiles">
            {spots.map(({ id, price, city, state, avgRating, previewImage }) => {
                return (
                    <SpotTile
                        key={id}
                        price={price}
                        location={`${city}, ${state}`}
                        avgRating={avgRating}
                        previewImage={previewImage}
                    />
                );
            })}
        </div>
    )
}

export default SpotTiles;
