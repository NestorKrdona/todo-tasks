const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const api = require('./api');

app.listen(port, function () {
    console.log("Server is listening at port: " + port);
});

app.get('/', function (req, res) {
    res.send("hello world");
});

app.use('/api', api);