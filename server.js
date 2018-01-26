var express = require('express');
var dbconfig = require('./config/db');
var db = require('./controllers/dbStudentsController');
var bodyParser = require('body-parser');
var msg = require('./controllers/dbMessagesController');
var server = express();

var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');

server.set('port', (process.env.PORT || 5000));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
//Для тестирования
server.get('/', (req, res) =>{
     return res.send('Hello !!!');
});
//Получение информации о  пользователе
server.get('/api/v1/getStud/:id_stud', db.findOne);
//Регистрация пользователя
server.post("/api/v1/regStud", db.addUser);
//Удаление пользотвателя
server.delete("/api/v1/deleteStud/:id_stud", db.deleteUser);

//Добавление нового сообщения
server.post("/api/v1/regMessage", msg.registrationMessage);
//Получение заявки (для работника)
server.get('/api/v1/getMessage/:type_work', msg.findOne);
//Изменение статуса (для студента в случае неудовлетворенности выполненной работой)
server.put('/api/v1/updateStatusProc', msg.updateStatusProc);
//Изменение статуса при выполении задачи на done
server.put('/api/v1/updateStatusDone', msg.updateStatusDone);
//Получение всех сообщений конкретного пользователя
server.get('/api/v1/getMsgUser/:id_stud', msg.findAllMessages);

// aws.config.loadFromPath('./config/s3_config.json');

aws.config.update({
    secretAccessKey: "BwudzHUdSPsVBWJW9mD6ygTNhsErbsAVkdZsCIGy",
    accessKeyId: "AKIAIP5FNQOQ7N6H5F5A",
    region:"us-east-1"
});

var s3 = new aws.S3({/*   */});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'smartstud',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

server.post('/api/v1/image', upload.array('photos', 1), (req, res, next) =>{
    return res.send('Hello !!!');
});

server.listen(server.get('port'), () => {
    console.log('Server is started');
});