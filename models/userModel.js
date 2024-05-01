const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);



// this  is a middleware executes before save(other methods are like 'remove' etc) an user into db ie here we are encrytpting password
userSchema.pre("save", async function (next) {

//this is for when user updates his details it checks whether the user password is updated or not. if the password is the same then if() is executed
  if (!this.isModified("password")) {
    next();
  }

  //this gets executed when a new user is created or existing user password is changed
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



//creating methods on the user model. These methods can be avaiable on the userCtrl
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.createPasswordResetToken = async function () {
  
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resettoken).digest("hex");
  
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes

  return resettoken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);
