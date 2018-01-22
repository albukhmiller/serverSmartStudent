var mongoose = require('mongoose');
var url = 'mongodb://alexbukhmiller:ulupos5555@ds133127.mlab.com:33127/smart_student';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useMongoClient: true })
    .then(() => console.log("Connection is success!"))
    .catch(e => console.log(e));