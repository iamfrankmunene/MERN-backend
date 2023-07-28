const mongoose = require('mongoose')

const Schema = mongoose.Schema
// Create a schema for the Shelflife inputs
const shelflifeModel = new Schema({
     item: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
  },
  completed: {
    type: Boolean
  }
})
  
  module.exports = mongoose.model('ShelflifeInputs', shelflifeModel)