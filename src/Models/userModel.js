const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    mobileNumber: {
        type: String,
        required: true,
        validate: /^\d{10}$/,
        trim: true
    },

    DOB: {
        type: String,
        required: true,
        validate: /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/,
        trim: true
    },

    emailID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        required: true,
        enum: ['ACTIVE', 'INACTIVE'],
        trim: true
    },

    isDeleted: {
        type: String,
        default: false,
    }

}, { timestamps: true })


module.exports = mongoose.model('UserData', userSchema)