# ReqRepable Socket
This module provides `socket.req()` and `socket.rep()` capabilities to your sockets.

## Installation
```
npm install reqrepable-socket

## Examples

**Server**
```javascript
var net = require('net');
var RRSocket = require('../');

function connection(sock){
    var socket = RRSocket(sock);

    socket.req('a message', {custom: 'test'}, function(answer){
        // returns: 'i see that...'
        console.log(answer);
    });

    socket.rep('another message', function(a, b, reply){
        // returns: 'hello', 'world'
        console.log(a, b);
        
        reply('ye so...');
    });
};

var server = net.createServer(connection);
server.listen(3000);
```

**Client**
```javascript
var net = require('net');
var RRSocket = require('../');

var socket = RRSocket(net.connect(3000));

socket.rep('a message', function(a, reply){
    // returns: {custom: 'test'}
    console.log(a);
    
    reply('i see that...');
});

socket.req('another message', 'hello', 'world', function(answer){
    // returns: 'ye so...'
    console.log(answer);
});
```