const mongoose = require('mongoose')
const schema = mongoose.Schema

const tableSchema = schema({
  id: Number,
  description: String,
  capacity: Number,
  avaialbility: Number
})

const table = mongoose.model('table', tableSchema)

module.exports = table