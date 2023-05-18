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

    const spotImage = await SpotImage.findByPk(imageId)

    if (!spotImage) {
        return res.status(404).json({ message: 'Spot Image couldn\'t be found' })
    }

    const spot = await spotImage.getSpot()

    if (userId !== spot.ownerId) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    await spotImage.destroy()

    return res.status(200).json({ message: 'Successfully deleted' })
})

module.exports = router;
