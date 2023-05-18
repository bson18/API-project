const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, Review } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: { userId: userId }
    });

    const updatedReviews = [];

    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];

        const user = await review.getUser({
            attributes: ['id', 'firstName', 'lastName']
        })

        const spot = await review.getSpot({
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        })

        const spotImages = await SpotImage.findAll({
            where: {
                spotId: review.spotId,
                preview: true
            },
            attributes: ['url']
        })

        if (spotImages.length > 0) {
            spot.dataValues.previewImage = spotImages[0].url;
        } else {
            spot.dataValues.previewImage = 'no images available'
        }

        const reviewImages = await review.getReviewImages({
            attributes: ['id', 'url']
        })

        updatedReviews.push({
            ...review.toJSON(),
            User: user,
            Spot: spot,
            ReviewImages: reviewImages
        })
    }

    return res.status(200).json({ Reviews: updatedReviews })
})



module.exports = router;
