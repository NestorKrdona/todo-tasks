var mongoose = require("mongoose");
var express = require("express");
var TaskModel = require('./task_schema');
var router = express.Router();

let environment = null;

if (!process.env.ON_DEPLOY) {
    console.log("Cargando variables de entorno desde archivo");
    const env = require('node-env-file');
    env(__dirname + '/.env');
}

environment = {
    DBMONGOUSER: process.env.DBMONGOUSER,
    DBMONGOPASS: process.env.DBMONGOPASS,
    DBMONGOSERV: process.env.DBMONGOSERV,
    DBMONGO: process.env.DBMONGO,
};

var query = 'mongodb+srv://' + environment.DBMONGOUSER + ':' + environment.DBMONGOPASS + '@' + environment.DBMONGOSERV + '/' + environment.DBMONGO + '?retryWrites=true&w=majority';

const db = (query)

mongoose.Promise = global.Promise;

mongoose.connect(db).then(() => {
    console.log('Conexión a la base de datos exitosa');
}).catch((err) => {
    console.error('Error al conectar a la base de datos', err);
});


router.post('/create-task', function (req, res) {
    let task_id = req.body.TaskId;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = {
        TaskId: task_id,
        Name: name,
        Deadline: deadline
    }

    var newTask = new TaskModel(task);

    newTask.save()
        .then(data => {
            res.status(200).send("OK\n");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal error\n");
        });
});

router.get('/all-tasks', function (req, res) {
    TaskModel.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal error\n");
        });
});

router.post('/update-task', function (req, res) {
    TaskModel.updateOne(
        { TaskId: req.body.TaskId }, 
        {
            Name: req.body.Name,
            Deadline: req.body.Deadline
        }
    )
        .then(data => {
            res.status(200).send("OK\n");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal error\n");
        });
});

router.delete('/delete-task', function (req, res) {
    TaskModel.deleteOne({ TaskId: req.body.TaskId })
        .then(data => {
            res.status(200).send("OK\n");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal error\n");
        });
});

module.exports = router;