const {Schema, model}=require('mongoose')
/*
{
    "firstName":"John",
    "LastName: "Doe",
    "gender":"M"   //"M": Male or "F": Female or "O": Other,
    "email":"john@doe.com",
    "createdId":"65665545ae56e4545e"
}


*/

const passengerSchema = new Schema ({
    firstName:{
        type: String, 
        required: true, 
        trim: true, 
    }
    lastName: {
        type: String, 
        required: true, 
        trim: true, 
    },
    gender: {
        type:String,
        enum: [null, 'M', 'F', 'O'],
        default: null
    },
    email: {
        type: String, 
        required: [true,' Email is required'], 
        trim: true, 
        unique: true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please Enter a valid email']
    },
    createdId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
}, {timestamps: true }) 


module.exports = model('Passenger', passengerSchema)