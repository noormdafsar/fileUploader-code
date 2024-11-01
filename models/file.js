const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    }
}, { 
    timestamps: true
});

module.exports = mongoose.model('File', fileSchema); 