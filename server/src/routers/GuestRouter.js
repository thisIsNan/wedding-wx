const express = require('express')
const router = express.Router()
const config = require('../../config')

//Database
const mongoose = require('mongoose')
const dbUrl = `${config.dbUrl}`

mongoose.connect(dbUrl, { useMongoClient: true })
mongoose.Promise = global.Promise

const Guest = require('../entities/Guest')

//Add guest
router.post('/', function(req, res, next){
    let body = req.body
    let guest = new Guest({
        name: body.name, 
        side: body.side,
        attendance: body.attendance,
        checkin: body.checkin
    })
    guest.save(function(err, guest){
        if(err){
            res.status(500).send('Error when adding new guest');
        }else{
            res.status(201).send('Successfully added new guest');            
        }
    })
})

//get guest by id
router.get('/:id', function(req, res, next){
    Guest.findOne({id: req.params.id}, function(err, guest){
        if(err){
            res.status(500).send('Error when looking for guest when id: ' + req.params.id)
        }else{
            if(!guest){
                res.status(404).send('Can not find guest when id: ' + req.params.id)
            }else{
                res.status(200).json(guest);                
            }
        }
    })
})

//get all guests
router.get('/', function(req, res, next){
    Guest.find(function(err, guests){
        if(err){
            res.status(500).send('Error when getting guests')
        }else{
            res.json(guests)
        }
    });
});

//update guest by id
router.put('/:id', function(req, res, next){
    console.log('Updating guest with id: ' + req.params.id)
    let updateMap = req.body
    Guest.findOneAndUpdate({id: req.params.id}, {'$set': updateMap}, function(err, guest){
        if(err){
            res.status(500).send('Error updating guest with id: ' + req.params.id)
        }else{
            if(!guest){
                res.status(404).send('Can not find guest with id: ' + req.params.id)
            }else{
                res.status(200).send('Successfully updated guest with id: ' + req.params.id)
            }
        }
    })
});

//delete guest by id
router.delete('/:id', function(req, res, next){
    console.log('Deleting guest with id: ' + req.params.id)
    Guest.findOneAndRemove({id: req.params.id}, function(err, guest){
        if(err){
            res.status(500).send('Error deleting guest with id: ' + req.params.id)       
        }else{
            if(!guest){
                res.status(404).send('Can not find guest with id: ' + req.params.id)
            }else{
                res.status(200).send('Successfully deleted guest with id: ' + req.params.id)              
            }
        }
    })
});

module.exports = router
