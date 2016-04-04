var socket = io();

var eventIds = [];

$(document).keydown( function(e) {
  var response = {
    key: e.which,
    id: Math.floor(Math.random()*90000) + 10000
  };
  socket.emit( 'key-down', response );
  eventIds.push(response.id);
  console.log('key-down: ' + response.key + ' ' + response.id);
  //e.preventDefault();
});
$(document).keyup( function(e) {
  var response = {
    key: e.which,
    id: Math.floor(Math.random()*90000) + 10000
  };
  socket.emit( 'key-up', response );
  eventIds.push(response.id);
  console.log('key-up: ' + response.key + ' ' + response.id);
  //e.preventDefault();
});

socket.on('key-down', function(response) {
  console.log('key-down event received!');
  var idIndex = eventIds.indexOf(response.id);
  if ( idIndex === -1 ) {
    eventIds.push( idIndex );
    var e = jQuery.Event( 'keydown', { which: response.key } );
    $(document).trigger(e);
  } else {
    //eventIds.splice( idIndex, 1 );
  }
});
socket.on('key-up', function(response) {
  console.log('key-up event received!');
  var idIndex = eventIds.indexOf(response.id);
  if ( idIndex === -1 ) {
    eventIds.push( idIndex );
    var e = jQuery.Event( 'keyup', { which: response.key } );
    $(document).trigger(e);
  } else {
    //eventIds.splice( idIndex, 1 );
  }
});
