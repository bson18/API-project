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
    }

    return res.status(200).json({ Bookings: updatedBookings })
})

//Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId
    const { startDate, endDate } = req.body
    const userId = req.user.id

    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        return res.status(404).json({ message: 'Booking couldn\'t be found' })
    }

    if (userId !== booking.userId) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    const currentDate = new Date()
    const bookingEndDate = new Date(booking.endDate)

    if (bookingEndDate < currentDate) {
        return res.status(403).json({ message: 'Past bookings can\'t be modified' })
    }

    const spot = await Spot.findByPk(booking.spotId)

    const bookings = await spot.getBookings()

    for (let i = 0; i < bookings.length; i++) {
        const otherBooking = bookings[i]

        if (otherBooking.id !== bookingId && otherBooking.startDate <= endDate && otherBooking.endDate >= startDate) {
            return res.status(403).json({
                message: 'Sorry, this spot is already booked for the specified dates',
                errors: {
                    startDate: 'Start date conflicts with an existing booking',
                    endDate: 'End date conflicts with an existing booking'
                }
            })
        }
    }

    const updatedBooking = await booking.update({ startDate, endDate })

    return res.status(200).json(updatedBooking)
})

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const bookingId = req.params.bookingId

    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        return res.status(404).json({ message: 'Booking couldn\'t be found' })
    }

    const spot = await booking.getSpot()

    if (userId !== booking.userId && spot.ownerId !== userId) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    const bookingStartingDate = new Date(booking.startDate)
    const currentDate = new Date()

    if (bookingStartingDate <= currentDate) {
        return res.status(403).json({ message: 'Bookings that have been started can\'t be deleted' })
    }

    await booking.destroy()

    return res.status(200).json({ message: 'Successfully deleted' })
})

module.exports = router;
