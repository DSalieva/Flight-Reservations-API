const Flight = require("../models/Flight");
const Passenger = require("../models/Passenger");
const Reservation = require("../models/Reservation");

// URL: GET  /api/reservations/
exports.list = async (req, res, next) => {
  const data = await res.getModelList(Reservation)
  res.status(200).send({
      success: true, 
      details: await res.getModelListDetails(Reservation),
      data
  })
};

exports.create = async (req, res, next) => {
  // Check passengers
  let passengerInfos = req.body?.passengers || [];
  let passengersIds = [];
  let passenger = null;

  // Search for the flight using the flightNumber
  const flight = await Flight.findOne({ flightNumber: req.body.flightId });
  req.body.flightId = flight._id;

  for (let passengerInfo of passengerInfos) {
    if (typeof passengerInfo == "object")
      passenger = await Passenger.findOne({ email: passengerInfo.email });
    else passenger = await Passenger.findOne({ email: passengerInfo });

    if (passenger) passengersIds.push(passenger._id);
  }

  req.body.passengers = passengersIds;
  const data = await Reservation.create(req.body);
  res.status(201).send({
    success: true,
    data,
  });
};

// URL: GET  /api/reservations/:id
exports.read = async (req, res, next) => {
  const data = await Reservation.findById(req.params.id);
  res.status(200).send({
    success: true,
    data,
  });
};

// URL: PUT  /api/reservations/:id
exports.update = async (req, res, next) => {
  if (req.body.passengers) {
    // Check passengers
    let passengerInfos = req.body?.passengers || [];
    let passengersIds = [];
    let passenger = null;
    for (let passengerInfo of passengerInfos) {
      if (typeof passengerInfo == "object")
        passenger = await Passenger.findOne({ email: passengerInfo.email });
      else passenger = await Passenger.findOne({ email: passengerInfo });

      if (passenger) passengersIds.push(passenger._id);
    }

    req.body.passengers = passengersIds;
  }

  if(req.body.flightId){
    // Search for the flight using the flightNumber
  const flight = await Flight.findOne({ flightNumber: req.body.flightId });

  req.body.flightId = flight._id;
  }

  const data = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(202).send({
    success: true,
    data,
  });
};


// URL: DELETE  /api/reservations/:id
exports.delete = async(req, res, next)=>{
    const data = await Reservation.deleteOne({_id: req.params.id})
    res.status(data.deletedCount? 204: 404).send({
        success: data.deletedCount? true: false,
        data
    })
}


exports.passengers = async(req, res, next)=>{
 
    const data = await Reservation.findOne({_id: req.params.id})
    const passengers = await Passenger.find({_id: {$in: data.passengers}})
    res.status(200).send({
        success: true, 
        count: passengers.length,
        passengers
    })
}