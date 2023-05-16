const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, Sequelize } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

    return res.status(200).json({Spots: spots});
})

module.exports = router;
