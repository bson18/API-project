const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

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

    return res.status(200).json({Spots: spotsAssociations});
});

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

router.post('/', validateSpotCreation, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const ownerId = req.user.id;

    const newSpot = await Spot.create({ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json(newSpot);
})

module.exports = router;
