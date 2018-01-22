var msg = require('../models/dbMessages');
var Message = require('../dbModel/Messages');
exports.registrationMessage = function(req, res){
    var message = new Message({
        id_stud: req.body.id_stud,
        photo1: req.body.photo1,
        photo2: req.body.photo2,
        photo3: req.body.photo3,
        location: req.body.location,
        time_state: req.body.time_state,
        time_impl: req.body.time_impl,
        type_work: req.body.type_work,
        description: req.body.description   
    });
    msg.addMessage(message, (err) => {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    })
}

exports.findAllMessages = function(req, res){
    msg.getAllMessages(req.params.id_stud, (err, docs) => {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send(docs);
    });
}

exports.findOne = function(req, res){
    msg.findOne(req.params.type_work, (err, message) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send(message);
    });
}

function callbackUpdateStatus(err, res){
    if(err){
        console.log(err);
        return res.sendStatus(500);
    }
    console.log('Статус сообщения обновлен!');
    return res.sendStatus(200);
}

exports.updateStatusProc = function(req, res){
    msg.updateStatusProc(req.body.id, (err) => {
       callbackUpdateStatus(err, res);
    });
}

exports.updateStatusDone = function(req, res){
    msg.updateStatusDone(req.body.id, (err) => {
        callbackUpdateStatus(err, res);
    });
}