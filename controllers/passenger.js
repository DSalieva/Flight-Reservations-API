const Passenger = require('../models/Passenger');

// URL: GET  /api/passengers/
exports.list = async(req, res, next)=>{
    const data = await res.getModelList(Passenger)
    res.status(200).send({
        success: true, 
        details: await res.getModelListDetails(Passenger),
        data
    })
}

// URL: POST  /api/passengers/
exports.create = async(req, res, next)=>{
    const data = await Passenger.create(req.body)
    res.status(201).send({
        success: true,
        data
    })
}

// URL: GET  /api/passengers/:id
exports.read = async(req, res, next)=>{
    const data = await  Passenger.findById(req.params.id)
    res.status(200).send({
        success: true,
        data
    })
}

// URL: PUT  /api/passengers/:id
exports.update = async(req, res, next)=>{
    const data = await Passenger.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.status(202).send({
        success: true,
        data
    })
}

// URL: DELETE  /api/passengers/:id
exports.delete = async(req, res, next)=>{
    const data = await Passenger.deleteOne({_id: req.params.id})
    res.status(data.deletedCount? 204: 404).send({
        success: data.deletedCount? true: false,
        data
    })
}