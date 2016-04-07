var socket = io();

//var eventIds = [];

var keyStates = new Array(999);
// keyStates[37] = false; // left arrow
// keyStates[39] = false; // right arrow
// keyStates[13] = false; // enter
// keyStates[74] = false; // j
// keyStates[76] = false; // l
// keyStates[73] = false; // i
for ( var i = 0; i < keyStates.length; i++ ) {
  keyStates[i] = false;
}

$(document).keydown( function(e) {
  var keyCode = parseInt(e.which);

  // test if key is already down
  if ( isKeyDown( keyCode ) ) {
    return;
  } else {
    //keyStates[keyCode] = true;
    // emit key down response
    var response = {
      key: keyCode,
      id: Math.floor(Math.random()*90000) + 10000
    };
    socket.emit( 'key-down', response );
    ///eventIds.push(response.id);
    console.log('key-down: ' + response.key + ' ' + response.id);
    //e.preventDefault();
  }
});
$(document).keyup( function(e) {
  var keyCode = parseInt(e.which);

  // test if key is already up
  if ( isKeyDown( keyCode ) ) {
    //keyStates[keyCode] = false;
    // emit key up response
    var response = {
      key: keyCode,
      id: Math.floor(Math.random()*90000) + 10000
    };
    socket.emit( 'key-up', response );
    //eventIds.push(response.id);
    console.log('key-up: ' + response.key + ' ' + response.id);
    //e.preventDefault();
  } else {
    return;
  }
});

socket.on('key-down', function(response) {
  console.log('key-down event received!');
  //var idIndex = eventIds.indexOf(response.id);
  //if ( idIndex === -1 ) {
    //eventIds.push( idIndex );
    //var e = jQuery.Event( 'keydown', { which: response.key } );
    //$(document).trigger(e);
  //} else {
    //eventIds.splice( idIndex, 1 );
  //}
  keyStates[response.key] = true;
});
socket.on('key-up', function(response) {
  console.log('key-up event received!');
  //var idIndex = eventIds.indexOf(response.id);
  //if ( idIndex === -1 ) {
    //eventIds.push( idIndex );
    //var e = jQuery.Event( 'keyup', { which: response.key } );
    //$(document).trigger(e);
  //} else {
    //eventIds.splice( idIndex, 1 );
  //}
  keyStates[response.key] = false;
});

function socketIsDown() {
  return false;
}

function isKeyDown( keyCode ) {
  //console.log( 'isKeyDown: keyCode = ' + keyCode + ', result = ' + keyStates[ keyCode ] + ', right arrow is down = ' + keyStates[39] + ', keyStates = ');
  //console.dir(keyStates);
  //if ( keyStates[ keyCode ] ) console.log('________TRUESERS_________  >>>> ' + keyCode);
  return keyStates[ keyCode ];
}
