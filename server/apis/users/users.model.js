const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('User', UserSchema);