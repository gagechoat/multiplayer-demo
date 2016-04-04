var socket = io();

//var eventIds = [];

var states = [];
states[37] = false; // left arrow
states[39] = false; // right arrow
states[13] = false; // enter
states[74] = false; // j
states[76] = false; // l
states[73] = false; // i

$(document).keydown( function(e) {
  var response = {
    key: e.which,
    id: Math.floor(Math.random()*90000) + 10000
  };
  socket.emit( 'key-down', response );
  ///eventIds.push(response.id);
  console.log('key-down: ' + response.key + ' ' + response.id);
  //e.preventDefault();
});
$(document).keyup( function(e) {
  var response = {
    key: e.which,
    id: Math.floor(Math.random()*90000) + 10000
  };
  socket.emit( 'key-up', response );
  //eventIds.push(response.id);
  console.log('key-up: ' + response.key + ' ' + response.id);
  //e.preventDefault();
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
  states[response.key] = true;
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
  states[response.key] = false;
});

function socketIsDown( keyCode ) {
  //console.log( 'socketIsDown: keyCode = ' + keyCode + ', result = ' + states[ parseInt( keyCode ) ]);
  if ( parseInt( keyCode )  ) console.log('________TRUESERS_________  >>>> ' + keyCode);
  return states[ parseInt( keyCode ) ];
}
