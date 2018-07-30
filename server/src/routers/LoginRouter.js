const express = require('express')
const router = express.Router()
const config = require('../../config')

//Database
const mongoose = require('mongoose')
const dbUrl = `${config.dbUrl}`
mongoose.connect(dbUrl, { useMongoClient: true })
mongoose.Promise = global.Promise

const User = require('../entities/User')

router.post('/', (req, res, next) => {
  if(!req.body.username || !req.body.password){
    res.status(400).send('Invalid username or password')
  }else{
    User.findOne({ username: req.body.username }, (err, user) => {
      if(err){
        res.status(403).send('Error when validating user')
      }else if(!user){
        res.status(403).send('Unable to find user with username: ' + req.body.username)        
      }else if(user.password === req.body.password){
        res.sendStatus(200)
      }else{
        res.sendStatus(403)
      }
    })
  }
})


router.post('/user', (req, res, next) => {
  if(!req.body.username || !req.body.password){
    res.status(500).send('Invalid username or password')
  }else{
    User.findOne({ username: req.body.username }, (err, user) => {
      if(err){
        res.sendStatus(500)
      }else if(!user){
        let user = new User({
          username: req.body.username,
          password: req.body.password
        })
        user.save((err, user) => {
          if(err){
            res.sendStatus(500)
          }else{
            res.status(201).send('Successfully added new user')
          }
        })
      }else{
        res.status(400).send('Found existing user with username: ' + req.body.username)
      }
    })
  }
})

module.exports = router
