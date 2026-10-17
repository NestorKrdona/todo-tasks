const express = require('express');
const api = require('./api');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.listen(port, function () {
    console.log("Server is listening at port: " + port);
});

app.use('/api', api);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
