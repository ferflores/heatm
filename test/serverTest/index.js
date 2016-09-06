var express = require('express');
var bodyParser = require('body-parser');

var projects = {};

var app = express();

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended:true}));

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
  if(!projects[req.body.project]){
    projects[req.body.project] = [];
  }

  var points = JSON.parse(req.body.points);

  points.forEach(function(point){
    projects[req.body.project].push(point);
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
