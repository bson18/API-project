import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { thunkCreateSpot } from "../../../store/spots"

const CreateSpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
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
        if (previewImage.length === 0) errors.previewImage = 'Preview image is required'
        if (!previewImage.match(/\.(jpg|jpeg|png)$/)) errors.previewImage = 'Image URL must end in .png, .jpg, or .jpeg'
        if (img1 && !img1.match(/\.(jpg|jpeg|png)$/)) errors.img1 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (img2 && !img2.match(/\.(jpg|jpeg|png)$/)) errors.img2 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (img3 && !img3.match(/\.(jpg|jpeg|png)$/)) errors.img3 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (img4 && !img4.match(/\.(jpg|jpeg|png)$/)) errors.img4 = 'Image URL must end in .png, .jpg, or .jpeg'
        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const onSubmit = async e => {
        e.preventDefault()
        if (!validation()) return

        const createSpot = {
            country, address, city, state, lat, lng, description, name, price
        }

        let imgUrls = []

        const previewImg = {
            url: previewImage,
            preview: true
        }
        imgUrls.push(previewImg)
        if (img1) imgUrls.push({ url: img1, preview: false })
        if (img2) imgUrls.push({ url: img2, preview: false })
        if (img3) imgUrls.push({ url: img3, preview: false })
        if (img4) imgUrls.push({ url: img4, preview: false })

        let spot = await dispatch(thunkCreateSpot(createSpot, imgUrls))
        if (spot) {

            history.push(`/spots/${spot.id}`)
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <div>
                    <h2>Create a New Spot</h2>
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

                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot</p>
                <div>
                    <input
                        value={previewImage}
                        type='text'
                        placeholder="Preview Image URL"
                        onChange={e => setPreviewImage(e.target.value)}
                    />
                    <div className="error"> {validationErrors.previewImage && `${validationErrors.previewImage}`}</div>
                </div>
                <div>
                    <input
                        value={img1}
                        type='text'
                        placeholder="Image URL"
                        onChange={e => setImg1(e.target.value)}
                    />
                    <div className="error"> {validationErrors.img1 && `${validationErrors.img1}`}</div>
                </div>
                <div>
                    <input
                        value={img2}
                        type='text'
                        placeholder="Image URL"
                        onChange={e => setImg2(e.target.value)}
                    />
                    <div className="error"> {validationErrors.img2 && `${validationErrors.img2}`}</div>
                </div>
                <div>
                    <input
                        value={img3}
                        type='text'
                        placeholder="Image URL"
                        onChange={e => setImg3(e.target.value)}
                    />
                    <div className="error"> {validationErrors.img3 && `${validationErrors.img3}`}</div>
                </div>
                <div>
                    <input
                        value={img4}
                        type='text'
                        placeholder="Image URL"
                        onChange={e => setImg4(e.target.value)}
                    />
                    <div className="error"> {validationErrors.img4 && `${validationErrors.img4}`}</div>
                </div>

                <button type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default CreateSpot;
