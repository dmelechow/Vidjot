const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const IdeaSchema = new Schema({
    title: {
        type: String,
        required: Boolean
    },
    
    details: {
        type: String,
        required: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('ideas', IdeaSchema);