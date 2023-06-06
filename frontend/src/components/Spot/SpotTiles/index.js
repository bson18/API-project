import { useEffect } from "react";
import * as spotActions from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotTile from "../SpotTile";
import './SpotTiles.css'

const SpotTiles = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.allSpots)

    useEffect(() => {
        dispatch(spotActions.thunkFetchSpots())
    }, [dispatch])

    return (
        <div className='spot-tiles'>
            {spots && spots.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))}
        </div>
    )
}

export default SpotTiles;
