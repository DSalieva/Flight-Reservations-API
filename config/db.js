const {connect} = require('mongoose')


module.exports = async()=>{

    try{
        const res = await connect(process.env.MONGODB) 
        console.log(`Connect with ${res.connection.host}`.yellow.underline);
    }catch(err){
        console.log(`DB Not connect : ${err.message}`.red);
    }
}