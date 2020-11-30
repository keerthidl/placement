const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const shortId = require("shortid");
SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    userId:{
        type:String,
        default:shortId.generate()
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      email: {
        type: String,
        required: true,
        maxlength: 50,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  
  userSchema.pre("save", function (next) {
    var user = this;
  
    // check if user password is modified
    if (!user.isModified("password")) return next();
  
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);
  
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
  
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });
  
  // compare password
  userSchema.methods.comparePassword = function (userPassword, cb) {
    bcrypt.compare(userPassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };
  
  module.exports = mongoose.model("user", userSchema);
// })