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
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    authority: {
        type: String,
        default: 'member'
    }
});

User.statics.create = function (email, password, nickname) {
    const user = new this({ email, password, nickname });
    
    return user.save();
}

module.exports = mongoose.model('User', User);