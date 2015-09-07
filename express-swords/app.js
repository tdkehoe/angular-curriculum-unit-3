var express    = require('express');
var bodyParser = require('body-parser');
var swords = require('./routes/swords')

var app = express();

var cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/swords', swords);
// app.use('/routes/swords', swords);

app.listen(process.env.PORT || 8080);
console.log('Woot, server started');

// module.exports = app;
