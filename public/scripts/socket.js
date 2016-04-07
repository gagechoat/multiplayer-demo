var socket = io();

// initialize keydown states array with all being false 
var keyStates = new Array(999);
for ( var i = 0; i < keyStates.length; i++ ) {
  keyStates[i] = false;
}

// emit keydown and keyup events
$(document).keydown( function(e) {
  var keyCode = parseInt(e.which);

  // test if key is already down
  if ( isKeyDown( keyCode ) ) {
    return;
  } else {
    // emit key down response
    var response = {
      key: keyCode,
      id: Math.floor(Math.random()*90000) + 10000
    };
    socket.emit( 'key-down', response );
    //console.log('key-down: ' + response.key + ' ' + response.id);
  }
});
$(document).keyup( function(e) {
  var keyCode = parseInt(e.which);

  // test if key is already up
  if ( isKeyDown( keyCode ) ) {
    var response = {
      key: keyCode,
      id: Math.floor(Math.random()*90000) + 10000
    };
    socket.emit( 'key-up', response );
    //console.log('key-up: ' + response.key + ' ' + response.id);
  } else {
    return;
  }
});

// test to see if a given key is down
function isKeyDown( keyCode ) {
  return keyStates[ keyCode ];
}

// receive events from socket
socket.on('key-down', function(response) {
  keyStates[response.key] = true;
});
socket.on('key-up', function(response) {
  keyStates[response.key] = false;
});
