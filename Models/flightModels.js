const mongoose = require('mongoose');
const flightSchema = mongoose.Schema({
from_location: {
    type: String, required: true
},
to_location: {
    type: String, required: true
},
dateTime: {
    type: Date, default: Date.now
},
passengers: [{
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }]
});


const Flight = mongoose.model('Flight', flightSchema)
module.exports = Flight;
