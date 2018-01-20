const express = require('express')
const HueServices = require('../services/hue.service')

const router = express.Router()

router.get('/groups', HueServices.getGroups)
router.get('/toggleGroup/:id', HueServices.toggleGroup)

module.exports = router
