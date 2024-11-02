const mongoose = require('mongoose');
const { Schema } = mongoose;
//const nodemailer = require('nodemailer');
const transporter = require('../config/nodemailer');

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
    // path: {
    //     type: String,
    //     required: true,
    // },
    size: {
        type: Number,
        required: true,
    }
}, { 
    timestamps: true
});

// Post middleware
fileSchema.post('save', async function(doc) {
    try {
        console.log('DOCs', doc);
        // transporter imported from conifg/nodemailer.js
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: doc.email,
            subject: 'File uploaded successfully',
            text: 'Your file has been uploaded successfully',
            html: `<h1>Your file has been uploaded successfully</h1> View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
        });
        console.log('Message sent: %s', info);
    }
    catch(err) {
        console.log('Error while sending mail', err);
    }

})

module.exports = mongoose.model('File', fileSchema); 