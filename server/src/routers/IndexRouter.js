const express = require('express')
const router = express.Router()
const config = require('../../config')

router.get('/', function(req, res, next){
    res.send('Index Page '+ `${config.port}`)
})

module.exports = router
