const { Schema, model } = require("mongoose");

/*
{
    "flightNumber":"A-9269",
    "airline":"Jetblue",
    "departure":"Miami FL",
    "departureDate":"2023-11-11 04:00:00",
    "arrival":"JFK New York",
    "arrivalDate":"2023-11-11 07:00:00",
    "createdId":"65665545ae56e4545e"
}
*/

const flightSchema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    airline: {
      type: String,
      required: true,
      trim: true,
    },
    depature: {
      type: String,
      required: true,
      trim: true,
    },
    depatureDate: {
      type: Date,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
      trim: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    createdId: {},
  },
  { timestamps: true }
);

// flightSchema.pre('save', function(next){
//     const departureDateStr = this.departureDate.toLocaleString('en-US', {dateStyle: 'full', timeStyle: 'medium'})
//     this.departureDateStr = departureDateStr
//     this.departureDate = undefined;
//     this.arrivalDateStr = this.arrivalDate.toLocaleString('en-US', {dateStyle: 'full', timeStyle: 'medium'})
//     this.arrivalDate = undefined;

//     next();
// })

flightSchema.pre("init", function (document) {
  document.departureDateStr = document.departureDate.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  });
  document.arrivalDateStr = document.arrivalDate.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  });
  document.__v = undefined;
});
module.exports = model("Flight", flightSchema);
