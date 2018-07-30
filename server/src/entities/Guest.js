var mongoose = require('mongoose')
var schema = mongoose.Schema

var guestSchema = schema({
  name: String,
  side: String,
  attendance: Number,
  checkin: Boolean
})

var guest = mongoose.model('guest', guestSchema)

module.exports = guest
