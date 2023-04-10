const express = require('express');
const mongoose = require('mongoose')
const server = express();
const Passenger = require('./Models/passengerModels');
const Flight = require('./Models/flightModels');
const cors = require('cors');
const { faker } = require('@faker-js/faker');


//middleware
server.use(express.json());
server.use(express.urlencoded({extended: true}));   

//cors
server.use(cors());

//create a passenger
server.post('/create-passenger', async(req, res) => {
    try {
        const passenger = await Passenger.create(req.body)
        res.status(200).json(passenger)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

//admin create a flight
server.post('/admin/create-flight', async(req, res) => {
    try {
        const flight = await Flight.create(req.body)
        res.status(200).json(flight)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// 

//Passenger can book flight
server.post('/book', async (req, res) => {
    try {
      const { name, flight_id } = req.body;
      const passenger = await Passenger.findOne({ name });
      if (!passenger) {
        return res.status(404).json({ message: "Passenger not found" })}
            const flight = await Flight.findById(flight_id);
            if (!flight) {
                return res.status(404).json({ message: "Flight not found" });
            }
      flight.passengers.push(passenger);
      await flight.save();
      const updatedFlight = await Flight.findById(flight_id).populate("passengers");
      res.status(200).json(updatedFlight);
      console.log(updatedFlight);
    } catch (error) {
      res.status(400).json(error.message);
    }
  });   

//Passenger can search for flight using location
server.get('/flights', async(req, res) => {
    const {from_location, to_location} = req.query
    const options = {}
    if (from_location) {
        options.from_location = from_location
    }
    if (to_location) {
        options.to_location = to_location
    }

    const flights = await Flight.find(options)
    try {
        res.status(200).json(flights)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//get all passengers
server.get('/all-passengers', async(req, res) => {
    try {
        const passengers = await Passenger.find({})
        res.status(200).json(passengers)  
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//get a passenger by id
server.get('/:id', async(req, res) => {
    try {
        const passengers = await Passenger.findById(req.params.id)
        res.status(200).json(passengers)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//MongoDB connection
const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log('Listening to port ' + (process.env.PORT || 3000));
    });
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });