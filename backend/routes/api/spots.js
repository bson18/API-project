const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

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
})

module.exports = router;
