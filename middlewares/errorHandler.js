module.exports = (err, req, res, next)=>{
    return res.status(res.errorCode || 500)
    .json({
        success: false, 
        message: err.message, 
        stack: err.stack
    })
}