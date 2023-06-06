import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

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
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
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
    }, [country, address, city, state, lat, lng, description, name, price, previewImage, img1, img2, img3, img4])

    const onSubmit = async e => {
        e.preventDefault()


    }
}
