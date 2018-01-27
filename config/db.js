var mongoose = require('mongoose');
var url = 'url mlab database';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useMongoClient: true })
    .then(() => console.log("Connection is success!"))
    .catch(e => console.log(e));