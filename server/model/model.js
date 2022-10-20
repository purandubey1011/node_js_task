const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    mobile : {
        type: Number,
        required: true,
        unique: true
    },
    status : String,
    task:String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;