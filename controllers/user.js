const User = require('../models/User')

// URL: GET  /api/users/
exports.list = async(req, res, next)=>{
    const data = await res.getModelList(User)
    res.status(200).send({
        success: true, 
        details: await res.getModelListDetails(User),
        data
    })
}

// URL: POST  /api/users/
exports.create = async(req, res, next)=>{
    const data = await User.create(req.body)
    res.status(201).send({
        success: true,
        data
    })
}

// URL: GET  /api/users/:id
exports.read = async(req, res, next)=>{
    const data = await User.findById(req.params.id)
    res.status(200).send({
        success: true,
        data
    })
}

// URL: PUT  /api/users/:id
exports.update = async(req, res, next)=>{
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.status(202).send({
        success: true,
        data
    })
}

// URL: DELETE  /api/users/:id
exports.delete = async(req, res, next)=>{
    const data = await User.deleteOne({_id: req.params.id})
    res.status(data.deletedCount? 204: 404).send({
        success: data.deletedCount? true: false,
        data
    })
}