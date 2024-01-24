const { Schema, model } = require("mongoose");
const { hash, genSalt, compare } = require("bcryptjs");
/*
{
    username: "test",
    password:'1234',
    email:"test@gmail.com",
    isActive: true, 
    isStaff: false, 
    isAdmin: false
}
*/

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, " Email is required"],
      trim: true,
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Please Enter a valid email",
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isStaff: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const salt = await genSalt(12);
  this.password = await hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return compare(enteredPassword, this.password);
};

module.exports = model("User", userSchema);
