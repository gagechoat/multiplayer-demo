var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('key-down', function( response ) {
    io.emit('key-down', response);
    //console.log('key down:'); console.dir(response);
  });
  socket.on('key-up', function( response ){
    io.emit('key-up', response);
    //console.log('key up:'); console.dir(response);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
