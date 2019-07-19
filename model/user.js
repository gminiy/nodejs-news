const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    authority: {
        type: String,
        default: 'member'
    }
});

User.statics.create = function (email, password) {
    if (!email || !password) throw Error("email and password is required");
    const user = new this({ email, password });
    
    return user.save();
}

module.exports = mongoose.model('User', User);