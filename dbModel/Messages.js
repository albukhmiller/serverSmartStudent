var mongoose = require('mongoose');

var msgShema = mongoose.Schema({
    id_stud: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    },
    photo: {
        type: String,
        default: null
    },
    location: String,
    type_work: String,
    time_state: Date,
    time_impl: Date,
    description : String,
    status :{
        type: String,
        default : 'proc'
    } 
});

var Message = mongoose.model('Messages', msgShema);

module.exports = Message;