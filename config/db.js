var mongoose = require('mongoose');
var url = 'mongodb://heroku_g2dnzfps:ulupos5555@ds111608.mlab.com:11608/heroku_g2dnzfps';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useMongoClient: true })
    .then(() => console.log("Connection is success!"))
    .catch(e => console.log(e));