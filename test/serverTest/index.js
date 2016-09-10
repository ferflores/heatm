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
  var screen = req.query.screen;

  if(Object.keys(projects).length < 1){
    return res.send({points: []})
  }

  var screenKey = Object.keys(projects[project])[0];
  if(screen){
    screenKey = screen.width + '_' + screen.height;
  }

  if(projects[project]){

    if(!projects[project][screenKey]){
        return res.send({isError:true, message: 'screenNotFound', availableScreens: projects[project]});
    }

    var from = req.query.limitLeft || 0;
    var to = req.query.limitRight || 10;

    res.send({
      points:projects[project][screenKey].slice(from, to)
    })
  }else{
      return res.send({isError:true, message: 'project not found'});
  }
});

app.post('/setPoints', (req, res) => {

  var project = req.body.project;
  var screen = req.body.screen.width + '_' + req.body.screen.height;
  var points = req.body.points;

  if(!projects[project]){
    projects[project] = {};
    console.log('project created:', project);
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
