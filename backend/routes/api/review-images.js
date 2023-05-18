const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, Review, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId
    const userId = req.user.id

    const reviewImage = await ReviewImage.findByPk(imageId)

    if (!reviewImage) {
        return res.status(404).json({ message: 'Review Image couldn\'t be found' })
    }

    const review = await reviewImage.getReview()

    if (userId !== review.userId) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    await reviewImage.destroy()

    return res.status(200).json({ message: 'Successfully deleted' })
})

module.exports = router;
