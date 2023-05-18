const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize')
const { check, body, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, Review, Booking, User } = require('../../db/models');

const router = express.Router();

const validateQueryParams = [
    check('page').optional().isInt({ min: 1, max: 10 }).toInt().withMessage('Page must be greater than or equal to 1'),
    check('size').optional().isInt({ min: 1, max: 20 }).toInt().withMessage('Size must be greater than or equal to 1'),
    check('maxLat').optional().isDecimal().withMessage('Maximum latitude is invalid'),
    check('minLat').optional().isDecimal().withMessage('Minimum latitude is invalid'),
    check('minLng').optional().isDecimal().withMessage('Minimum longitude is invalid'),
    check('maxLng').optional().isDecimal().withMessage('Maximum longitude is invalid'),
    check('minPrice').optional().isDecimal({ min: 0 }).withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice').optional().isDecimal({ min: 0 }).withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
]

//Get all Spots
router.get('/', validateQueryParams, async (req, res) => {
    let { page = 1, size = 20, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query

    const queryFilters = {
        ...(maxLat && { lat: {[Op.lte]: {maxLat}}}),
        ...(minLat && { lat: {[Op.gte]: {minLat}}}),
        ...(minLng && { lng: {[Op.gte]: {minLng}}}),
        ...(maxLng && { lng: {[Op.lte]: {maxLng}}}),
        ...(minPrice && {price: {[Op.gte]: {minPrice}}}),
        ...(maxPrice && {price: {[Op.lte]: {maxPrice}}})
    }

    const limit = size
    const offset = (page - 1) * limit

    const spots = await Spot.findAll({
        where: queryFilters,
        limit,
        offset
    });

    const spotsAssociations = await Promise.all(
        spots.map(async spot => {
            const reviews = await spot.getReviews({
                attributes: ['stars']
            });

            const spotImages = await spot.getSpotImages({
                attributes: ['url'],
                limit: 1
            })

            let avgRating = 0
            if (reviews.length > 0) {
                avgRating = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length
            } else {
                avgRating = null
            }

            let previewImage = ''
            if (spotImages.length > 0) {
                previewImage = spotImages[0].url
            } else {
                previewImage = 'There is no preview image'
            }

            return {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                avgRating,
                previewImage
            }
        })
    )

    return res.status(200).json({ Spots: spotsAssociations, page: parseInt(page), size: parseInt(size) });
});

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id;

    const spots = await Spot.findAll({
        where: { ownerId: ownerId }
    });

    const updatedSpots = [];

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];

        const spotImages = await spot.getSpotImages({
            attributes: ['url'],
            limit: 1
        })

        if (spotImages.length > 0) {
            spot.dataValues.previewImage = spotImages[0].url;
        } else {
            spot.dataValues.previewImage = 'no images available'
        }

        const reviews = await spot.getReviews();

        let starTotal = 0;
        reviews.forEach(review => {
            starTotal += review.dataValues.stars;
        })
        const avg = starTotal / reviews.length

        spot.dataValues.avgRating = avg;

        updatedSpots.push(spot.toJSON())
    }

    res.status(200).json({ Spots: updatedSpots })
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' })
    }

    const spotImages = await spot.getSpotImages({
        attributes: ['id', 'url', 'preview']
    })

    const owner = await spot.getUser({
        attributes: ['id', 'firstName', 'lastName']
    })

    const reviews = await spot.getReviews({
        attributes: ['stars']
    })

    if (reviews.length > 0) {
        let numReviews = 0;
        let starTotal = 0;
        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i]
            numReviews++
            starTotal += review.stars
        }
        let avgStarRating = 0
        if (numReviews > 0) {
            avgStarRating = starTotal / numReviews
        } else {
            return avgStarRating
        }
        spot.dataValues.numReviews = numReviews
        spot.dataValues.avgStarRating = avgStarRating
    } else {
        spot.dataValues.numReviews = 0
        spot.dataValues.avgStarRating = 0
    }

    if (spotImages.length > 0) {
        spot.dataValues.SpotImages = spotImages
    } else {
        spot.dataValues.SpotImages = 'no images available'
    }
    spot.dataValues.Owner = owner

    return res.status(200).json(spot)
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' })
    }

    const updatedReviews = [];

    const reviews = await Review.findAll({
        where: { spotId: spotId }
    })

    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i]

        const user = await review.getUser({
            attributes: ['id', 'firstName', 'lastName']
        })

        const reviewImages = await review.getReviewImages({
            attributes: ['id', 'url']
        })

        updatedReviews.push({
            ...review.toJSON(),
            User: user,
            ReviewImages: reviewImages
        })
    }

    return res.status(200).json({ Reviews: updatedReviews })
})

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const currentId = req.user.id

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' })
    }

    const bookings = await Booking.findAll({
        where: { spotId: spotId }
    })

    const updatedBookings = []

    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i]

        let updatedBooking = {
            id: booking.id,
            spotId: booking.spotId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }

        if (currentId && spot.ownerId === currentId) {
            const user = await User.findByPk(booking.userId)
            updatedBooking.User = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }
            updatedBooking.userId = booking.userId
        }

        if (spot.ownerId !== currentId) {
            updatedBooking = {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
        }

        updatedBookings.push(updatedBooking)
    }

    return res.status(200).json({ Bookings: updatedBookings })
})

const validateSpotCreation = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

//Create a Spot
router.post('/', requireAuth, validateSpotCreation, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const ownerId = req.user.id;

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json(newSpot);
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' })
    }

    const userId = req.user.id;

    if (userId !== spot.ownerId) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    const newImage = await SpotImage.create({ url, preview, spotId })

    const { createdAt, updatedAt, spotId: excludedSpotId, ...imageData } = newImage.toJSON()

    return res.status(200).json(imageData)
})

const reviewValidation = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, reviewValidation, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' })
    }

    const existingReview = await Review.findOne({
        where: {
            spotId,
            userId
        }
    })
    if (existingReview) {
        return res.status(500).json({ message: 'User already has a review for this spot' })
    }

    const review = await Review.create({
        userId,
        spotId,
        review: req.body.review,
        stars: req.body.stars
    })

    return res.status(201).json(review)
})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const { startDate, endDate } = req.body
    const userId = req.user.id


    let currentStartDate = new Date(startDate)
    let currentEndDate = new Date(endDate)

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' })
    }

    if (userId === spot.ownerId) {
        return res.status(403).json({ message: 'You can\'t book your own spot' })
    }

    if (currentStartDate > currentEndDate) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: {
                endDate: 'endDate cannot be on or before startDate'
            }
        })
    }

    const bookings = await spot.getBookings()

    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i]

        if (booking.startDate <= endDate && booking.endDate >= startDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    }

    const booking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    })

    return res.status(200).json(booking)
})

//Edit a Spot
router.put('/:spotId', requireAuth, validateSpotCreation, async (req, res) => {
    const spotId = req.params.spotId
    const ownerId = req.user.id

    const spot = await Spot.findByPk(spotId)
    if (!spot || ownerId !== spot.ownerId) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' })
    }

    const updatedSpot = await spot.update(req.body);

    return res.status(200).json(updatedSpot)
})

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const ownerId = req.user.id

    const spot = await Spot.findByPk(spotId)
    if (!spot || ownerId !== spot.ownerId) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' })
    }

    await spot.destroy();

    return res.status(200).json({ message: 'Successfully deleted' })
})

module.exports = router;
