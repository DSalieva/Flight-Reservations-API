const ErrorResponse = require("../utils/ErrorResponse")

exports.isLogin = (req, res, next)=>{
    if(req.user) next()
    throw new ErrorResponse(403, 'Login First !')
}

exports.isStaffOrAdmin = (req, res, next)=>{
    if(process.env.MODE=='development') return next()
    if(req.user.isStaff || req.user.isAdmin) next();
    throw new ErrorResponse(403, 'You must login as a staff or Admin !')
}

exports.isAdmin = (req, res, next)=>{
    if(process.env.MODE=='development') return next()
 
    if(req.user.isAdmin) next();
    throw new ErrorResponse(403, 'You must login as Admin !')
}