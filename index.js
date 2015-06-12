var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));


//gain access to static files
app.use(express.static('public'));
app.use(express.static('stylesheet'));
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/sites'));
app.use(express.static('/sites/odysey'));
app.use(express.static('/sites/gringotts'));
app.use(express.static('/sites/gringotts/logos'));
app.use(express.static('/sites/gringotts/images'));

app.get('/', function(request, response) {
    //response.send('Yo!');
    response.sendFile(__dirname + '/' + 'index.html');
});

app.get('/index.html', function (request, response) {
    response.sendFile(__dirname + '/' + 'index.html');
});

app.get('/page1.html', function (request, response) {
    response.sendFile(__dirname + '/' + 'page1.html');
});

app.get('/web-apps.html', function (request, response) {
    response.sendFile(__dirname + '/' + 'web-apps.html');
});

app.get('/sites/odysey/index.html', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/odysey/index.html');
});
//odysey
app.get('/sites/odysey/goldenglobe.jpg', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/odysey/goldenglobe.jpg');
});

app.get('/sites/odysey/script.js', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/odysey/script.js');
});

app.get('/sites/odysey/odysey_style.css', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/odysey/odysey_style.css');
});

app.get('/sites/odysey/shuttle.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/odysey/shuttle.png');
});

app.get('/sites/odysey/starrysky_ult.jpg', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/odysey/starrysky_ult.jpg');
});

app.get('/sites/odysey/timeline.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/odysey/timeline.png');
});

app.get('/sites/odysey/up_arrow1.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/odysey/up_arrow1.png');
});

//gringotts

app.get('/sites/gringotts/index.html', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/index.html');
});

app.get('/sites/gringotts/home.css', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/home.css');
});

app.get('/sites/gringotts/script.js', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/script.js');
});

app.get('/sites/gringotts/images/wikipedia_post_office.jpg', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/images/wikipedia_post_office.jpg');
});
//
app.get('/sites/gringotts/logos/black-book.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/black-book.png');
});

app.get('/sites/gringotts/logos/comp.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/comp.png');
});
app.get('/sites/gringotts/logos/down-arrow.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/down-arrow.png');
});

app.get('/sites/gringotts/logos/gringott-logo.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/gringott-logo.png');
});
app.get('/sites/gringotts/logos/lock.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/lock.png');
});

app.get('/sites/gringotts/logos/pencil.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/pencil.png');
});
app.get('/sites/gringotts/logos/people.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/people.png');
});

app.get('/sites/gringotts/logos/phone.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/phone.png');
});

app.get('/sites/gringotts/logos/school.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/school.png');
});

app.get('/sites/gringotts/logos/trans-phone.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/trans-phone.png');
});

app.get('/sites/gringotts/logos/white-book.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/white-book.png');
});

app.get('/sites/gringotts/logos/white-phone.png', function (request, response) {
    response.sendFile(__dirname + '/' + 'sites/gringotts/logos/white-phone.png');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
