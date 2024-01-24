const Flight = require('../models/Flight');
const Passenger = require('../models/Passenger');
const Reservation = require('../models/Reservation');

// URL: GET  /api/flights/
exports.list = async(req, res, next)=>{
    const data = await res.getModelList(Flight)
    res.status(200).send({
        success: true, 
        details: await res.getModelListDetails(Flight),
        data
    })
}

// URL: POST  /api/flights/
exports.create = async(req, res, next)=>{
    const data = await Flight.create(req.body)
    res.status(201).send({
        success: true,
        data
    })
}

// URL: GET  /api/flights/:id
exports.read = async(req, res, next)=>{
    const data = await  Flight.findById(req.params.id)
    res.status(200).send({
        success: true,
        data
    })
}

// URL: PUT  /api/flights/:id
exports.update = async(req, res, next)=>{
    const data = await Flight.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.status(202).send({
        success: true,
        data
    })
}

// URL: DELETE  /api/flights/:id
exports.delete = async(req, res, next)=>{
    const data = await Flight.deleteOne({_id: req.params.id})
    res.status(data.deletedCount? 204: 404).send({
        success: data.deletedCount? true: false,
        data
    })
}


// Get /api/flight/:id/passengers
exports.passengers = async(req, res, next)=>{
    const reservations = await Reservation.find({flightId: req.params.id})
    const flight = await Flight.findOne({_id:req.params.id})
    let data = [];

    reservations.forEach(res=>{
        data = [...new Set([...data, ...res.passengers])]
    })
  
    const passengers = []
    for(let id of data){
        passengers.push(await Passenger.findOne({_id: id}))
    }

   res.status(200).json({
    success: true, 
    fightNumber: flight.flightNumber,
    passengersCount: passengers.length,
    passengers

   })
}