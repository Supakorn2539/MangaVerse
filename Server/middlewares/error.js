module.exports = (err,req,res,next) => {
    console.log(err)
    const statuscode = err.statusCode || 500
    res.status(statuscode).json({error : err.message})
}