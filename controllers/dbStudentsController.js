var db = require('../models/dbStudents');
var User = require('../dbModel/Student');

exports.addUser = function (req, res) {

    var user = new User({
        id_stud: req.body.id_stud,
        name: req.body.name,
        group: req.body.group
    });

    db.addUser(user, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(user);
    });
}

exports.findOne = function (req, res) {
    db.findOne(req.params.id_stud, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log(user);
        res.send(user);
    })
}

exports.deleteUser = function(req, res){
    db.deleteUser(req.params.id, (err) => {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    })
}
