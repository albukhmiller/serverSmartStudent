var Message = require('../dbModel/Messages');
var mongoose = require('mongoose');


//Добавление нового сообщения  
exports.addMessage = function(msg,cb) {
    msg.save((err) => {
        cb(err); 
    });
}
//Получение сообщения (для работника)
exports.findOne = function(typeWork, cb){
    Message.findOneAndUpdate({status : 'proc', type_work: typeWork}, {status: 'exec'})
    .populate('id_stud')
    .exec((err, msg) => {
        cb(err, msg);
    });
}

//Получение всех сообщение конкретного студента
exports.getAllMessages = function(id, cb) {
    console.log(id);
    Message.find({id_stud: id}, (err, docs) => {
        cb(err, docs);
    });
}

// Если выполнение не понравилось, изменение статуса на proc
exports.updateStatusProc = function(id, cb){
    Message.findByIdAndUpdate(id, {status: "proc"}, (err) => {
         cb(err);
    })  
}

//Изменение статуса на done
exports.updateStatusDone = function(id, cb){
    Message.findByIdAndUpdate(id, {status: "done"}, (err) => {
         cb(err);
    });
}