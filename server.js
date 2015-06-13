var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));


//gain access to static files
app.use(express.static('public'));
app.use(express.static('stylesheet'));
app.use(express.static('js'));
app.use(express.static('scripts'));
app.use(express.static(__dirname + '/sites'));


//gain access to more static files      //looks for any directory that starts with /gringotts (even looks inside site!)
app.use('/gringotts', express.static(__dirname + '/gringotts'));
app.use('/odysey', express.static(__dirname + '/odysey'));

app.get('/', function(req, res) {
    //res.send('Yo!');
    res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/page1.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'page1.html');
});

app.get('/web-apps.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'web-apps.html');
});

//mini sites
app.get('/gringotts', function (req, res) {
    res.sendFile(__dirname + '/' + 'gringotts');
});

app.get('/odysey', function (req, res) {
    res.sendFile(__dirname + '/' + 'odysey');
});

//server listen

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});