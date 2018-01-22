var mongoose = require("mongoose");

var studShema = mongoose.Schema({
    name: String,
    id_stud: String,
    group: String
});

var Student = mongoose.model('Students', studShema);
module.exports = Student;