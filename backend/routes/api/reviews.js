const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

//Get all Reviews of the Current User
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

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId
    const userId = req.user.id

    const review = await Review.findByPk(reviewId)

    if (!review || userId !== review.userId) {
        return res.status(404).json({ message: 'Review couldn\'t be found' })
    }

    const imageCount = await ReviewImage.count({ where: { reviewId } })
    if (imageCount >= 10) {
        return res.status(403).json({ message: 'Maximum number of images for this resource was reached' })
    }

    const newImage = await ReviewImage.create({
        reviewId,
        url: req.body.url
    })

    const { createdAt, updatedAt, reviewId: excludedReviewId, ...imageData } = newImage.toJSON()

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

//Edit a Review
router.put('/:reviewId', requireAuth, reviewValidation, async (req, res) => {
    const reviewId = req.params.reviewId
    const userId = req.user.id

    const review = await Review.findByPk(reviewId)
    if (!review || userId !== review.userId) {
        return res.status(404).json({ message: 'Review couldn\'t be found' })
    }

    const updatedReview = await review.update(req.body)

    return res.status(200).json(updatedReview)
})

module.exports = router;
