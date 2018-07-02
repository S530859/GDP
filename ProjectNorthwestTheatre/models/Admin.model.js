const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var AdminSchema = new mongoose.Schema({
    Username: {
        type: String,
        trim: true,
        required: [true, "Username required"]
    },
    Email: {
        type: String,
        trim: true,
        required: [true, "Email required"]
    },
    Password: {
        type: String,
        trim: true,
        minlength: 6,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_!@#$%^&*]).+$/.test(v)
            },
            message: 'does not meet criteria for password (A-Z,a-z,0-9,special character)'
        },
        required: [true, "Password required"]
    },
    AccessToken: {
        type: String,
        trim: true
    }
})

AdminSchema.pre('save',function(next){
    var user = this;

    if (!user.isModified('Password')) return next();

    bcrypt.hash(user.Password,10)
    .then( hash => {
        console.log(hash)
        user.Password = hash
        next()
    })
    .catch( err => {
        next(err)
    })
    
})

AdminSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.Password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Admin', AdminSchema)