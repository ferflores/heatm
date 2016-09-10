var express = require('express');
var bodyParser = require('body-parser');

var projects = {};

var app = express();

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getPoints', (req, res) => {
  var project = req.query.project;

  if(projects[req.query.project]){
    var from = req.query.limitLeft || 0;
    var to = req.query.limitRight || 10;
    res.send({
      total:projects[project].length,
      points:projects[project].slice(from, to)
    })
  }else{
      res.send([]);
  }
});

app.post('/setPoints', (req, res) => {

  var project = req.body.project;
  var screen = req.body.screen.width + '_' + req.body.screen.height;
  var points = req.body.points;

  if(!projects[req.body.project]){
    projects[req.body.project] = {};
  }

  req.body.points.forEach(function(point){
    if(!projects[req.body.project][screen]){
      projects[req.body.project][screen] = [];
    }
    projects[req.body.project][screen].push(point);
  });

  res.send('ok');
});


app.listen('3000', function(err){
  if(err) {
    console.log(err);
    return;
  }
  console.log('Server listening at http://localhost:3000');
});
