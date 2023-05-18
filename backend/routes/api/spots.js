const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, Review } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

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

    return res.status(200).json({ Spots: spotsAssociations });
});

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

router.post('/', requireAuth, validateSpotCreation, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const ownerId = req.user.id;

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json(newSpot);
})

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

module.exports = router;
