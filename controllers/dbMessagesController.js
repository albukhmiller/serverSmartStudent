var msg = require('../models/dbMessages');
var Message = require('../dbModel/Messages');

var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');

var filename = null;

exports.registrationMessage = function(req, res, next){
    var message = new Message({
        id_stud: req.body.id_stud,
        photo:  filename,
        location: req.body.location,
        time_state: req.body.time_state,
        time_impl: req.body.time_impl,
        type_work: req.body.type_work,
        description: req.body.description   
    });
    filename = null;
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

//Загрузка фото на AWS S3
aws.config.loadFromPath('./s3_config.json');
var s3 = new aws.S3({/*   */});
exports.uploadPhoto = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'smartstud',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            filename = 'https://s3.us-east-2.amazonaws.com/smartstud/' + file.originalname;
            cb(null, file.originalname);
        }
    })
});