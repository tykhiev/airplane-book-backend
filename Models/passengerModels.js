const mongoose = require('mongoose');
const passengerSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    age: {
        type: Number, min: 1, required: true
    },
    gender:{
        type: String, enum: ['male', 'female'], required: true
    },
    email:{
        type: String, required: true
    }
})

const Passenger = mongoose.model('Passenger', passengerSchema)
module.exports = Passenger;
