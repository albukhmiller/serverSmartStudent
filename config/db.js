var mongoose = require('mongoose');
var url = 'mongodb://heroku_g2dnzfps:23031996b@ds111608.mlab.com:11608/heroku_g2dnzfps';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useMongoClient: true })
    .then(() => console.log("Connection is success!"))
    .catch(e => console.log(e));