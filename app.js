var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require("./models/index.js")

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get('/api/tasks', function(req, res) {
  db.task.findAll({order: [['createdAt', 'DESC']]}).success(function(allTasks) {
    res.json(allTasks)
  })
})

app.post('/api/tasks', function(req, res) {
  db.task.create(req.body.task).success(function(newTask) {
    res.json(newTask)
  })
})

app.delete('/api/tasks/:id', function(req, res) {
  db.task.find(req.params.id).success(function(foundTask) {
    res.json(foundTask.destroy())
  })
})

app.put('/api/tasks/:id', function(req, res) {
  db.task.find(req.params.id).success(function(foundTask) {
    res.json(foundTask.updateAttributes(req.body.task))
  })
})

app.listen(3000, function() {
  console.log("SERVER LISTENING ON 3000")
})