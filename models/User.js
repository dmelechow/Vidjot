const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: Boolean
    },
    email: {
        type: String,
        required: Boolean
    },
    password: {
        type: String,
        required: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('users', UserSchema);