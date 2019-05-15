var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database/db');
var  userApi = require('./api/userApi');
var  chatApi = require('./api/chatApi');
var passport = require('./passport/passport');

var http = require('http');
const socketIO = require('socket.io');
const path = require('path');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use('/users', userApi);
app.use('/chat', chatApi);

const server = http.createServer(app);  
const io = socketIO(server);

app.set('io', io);
app.use(express.static(path.join(__dirname, 'dist')));



server.listen(3002);
