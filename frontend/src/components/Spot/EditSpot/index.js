import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkFetchSingleSpot, thunkUpdateSpot } from "../../../store/spots"

const EditSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const spot = useSelector(state => state.spots)

    useEffect(() => {
        dispatch(thunkFetchSingleSpot(spotId))
    }, [dispatch, spotId])

    const { singleSpot } = spot
    const [country, setCountry] = useState(spot.country)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [description, setDescription] = useState(spot.description)
    const [name, setName] = useState(spot.name)
    const [price, setPrice] = useState(spot.price)
    const [validationErrors, setValidationErrors] = useState({})

    const validation = () => {
        const errors = {}

        if (country.length === 0) errors.country = 'Country is required'
        if (address.length === 0) errors.address = 'Address is required'
        if (city.length === 0) errors.city = 'City is required'
        if (state.length === 0) errors.state = 'State is required'
        if (lat.length === 0) errors.lat = 'Latitude is required'
        if (lng.length === 0) errors.lng = 'Longitude is required'
        if (isNaN(lat)) errors.lat = 'Latitude must be a number'
        if (isNaN(lng)) errors.lng = 'Longitude must be a number'
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if (name.length === 0) errors.name = 'Name is required'
        if (price.length === 0) errors.price = 'Price is required'
        if (isNaN(price) || price <= 0) errors.price = 'Price must be a number greater than 0'
        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const onSubmit = async e => {
        e.preventDefault()
        if (!validation()) return

        const spot = {
            ...singleSpot, country, address, city, state, lat, lng, description, name, price
        }

        let updatedSpot = await dispatch(thunkUpdateSpot(spot))
        if (updatedSpot) {
            history.push(`/spots/${spotId}`)
        }
    }

    if (!spot) return null

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <div>
                    <h2>Update your Spot</h2>
                    <h3>Where's your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation</p>
                </div>
                <div>
                    <span><label>Country</label></span><span className="error"> {validationErrors.country && `${validationErrors.country}`}</span>
                    <div>
                        <input
                            value={country}
                            type='text'
                            placeholder="Country"
                            onChange={e => setCountry(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <span><label>Street Address</label></span><span className="error"> {validationErrors.address && `${validationErrors.address}`}</span>
                    <div>
                        <input
                            value={address}
                            type='text'
                            placeholder="Address"
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <span><label>City</label></span><span className="error"> {validationErrors.city && `${validationErrors.city}`}</span>
                    <div>
                        <input
                            value={city}
                            type='text'
                            placeholder="City"
                            onChange={e => setCity(e.target.value)}
                        />
                    </div>
                    {' , '}
                    <span><label>State</label></span><span className="error"> {validationErrors.state && `${validationErrors.state}`}</span>
                    <div>
                        <input
                            value={state}
                            type='text'
                            placeholder="State"
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <span><label>Latitude</label></span><span className="error"> {validationErrors.lat && `${validationErrors.lat}`}</span>
                    <input
                        value={lat}
                        type='text'
                        placeholder="Latitude"
                        onChange={e => setLat(e.target.value)}
                    />
                    {' , '}
                    <span><label>Longitude</label></span><span className="error"> {validationErrors.lng && `${validationErrors.lng}`}</span>
                    <input
                        value={lng}
                        type='text'
                        placeholder="Longitude"
                        onChange={e => setLng(e.target.value)}
                    />
                </div>

                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <div>
                    <textarea
                        value={description}
                        type='text'
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="error"> {validationErrors.description && `${validationErrors.description}`}</div>
                </div>

                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <div>
                    <input
                        value={name}
                        type='text'
                        placeholder="Name of your spot"
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="error"> {validationErrors.name && `${validationErrors.name}`}</div>
                </div>

                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                <div>
                    {" $ "}<input
                        value={price}
                        type='text'
                        placeholder="Price per night (USD)"
                        onChange={e => setPrice(e.target.value)}
                    />
                    <div className="error"> {validationErrors.price && `${validationErrors.price}`}</div>
                </div>
                <button type="submit">Update your Spot</button>
            </form>
        </div>
    )
}

export default EditSpot
