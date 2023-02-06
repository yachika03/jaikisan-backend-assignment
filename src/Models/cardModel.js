const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId


const cardSchema = new mongoose.Schema({

    cardNumber: {
        type: String,
        required: true,
        trim: true
    },

    cardType: {
        type: String,
        enum: ['REGULAR', 'SPECIAL'],
        required: true,
        trim: true
    },

    customerName: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE',
        trim: true
    },

    vision: {
        type: String,
        required: true,
        trim: true
    },

    customerID: {
        type: ObjectID,
        required: true,
        ref: 'UserData',
        trim: true
    }

}, { timestamps: true })


module.exports = mongoose.model('CardData', cardSchema)
