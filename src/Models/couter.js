const mongoose = require('mongoose')


const counterSchema = new mongoose.Schema({

    id: {
        type: String
    },

    CouterNo: {
        type: Number,
        default: 0
    }

})


module.exports = mongoose.model('Couter', counterSchema)