var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5556);

app.get('/',function(req,res){
  var listToSend = [];
  for (var p in req.query) {
    listToSend.push({'name': p, 'value': req.query[p]});
  }
  var context = {};
  context.queryList = listToSend;
  context.type = "GET";
  res.render('result', context)
});

app.post('/',function(req,res){
  var queryStringList = [];
  for (var p in req.query) {
    queryStringList.push({'name': p, 'value': req.query[p]});
  }
  
  var bodyList = [];
  for (var p in req.body) {
    bodyList.push({'name': p, 'value': req.body[p]});
  }
  
  var context = {};
  context.queryList = queryStringList;
  context.bodyList = bodyList;
  context.type = "POST";
  res.render('result', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});