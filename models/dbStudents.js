var mongoose = require('mongoose');
var Worker = require('../dbModel/Student');

exports.addUser = function (user, cb) {
    user.save((err) => {
        cb(err); 
    })
};

exports.findOne = function (id_stud, cb) {
    Worker.findOne({ id_stud: id_stud }, (err, user) => {
        cb(err, user);
    });
}

exports.deleteUser = function (id_stud, cb) {
    Worker.findOneAndRemove({ id_stud: id_stud }, (err) => {
        cb(err);
    });

}