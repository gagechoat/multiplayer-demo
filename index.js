var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var eventIds = [];

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('key-down', function( response ) {
    //eventIds.push(response.id);
    //if ( eventIds.indexOf(response.id) === -1 ) {
      //eventIds.push( response.id );
      io.emit('key-down', response);
      console.log('key down:'); console.dir(response);
    //}
  });
  socket.on('key-up', function( response ){
    //if ( eventIds.indexOf(response.id) === -1 ) {
      //eventIds.push( response.id );
      io.emit('key-up', response);
      console.log('key up:'); console.dir(response);
    //}
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
