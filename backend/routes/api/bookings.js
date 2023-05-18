const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, Review, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const bookings = await Booking.findAll({
        where: { userId: userId }
    })

    const updatedBookings = []
    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i]
        const spot = await Spot.findByPk(booking.spotId)

        const spotImages = await SpotImage.findAll({
            where: {
                spotId: booking.spotId,
                preview: true
            },
            attributes: ['url']
        })

        if (spotImages.length > 0) {
            spot.dataValues.previewImage = spotImages[0].url;
        } else {
            spot.dataValues.previewImage = 'no images available'
        }

        const { createdAt, updatedAt, description, ...spotData } = spot.toJSON()

        updatedBookings.push({
            id: booking.id,
            spotId: booking.spotId,
            Spot: spotData,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        })
        console.log(updatedBookings)
    }

    return res.status(200).json({ Bookings: updatedBookings })
})

module.exports = router;
