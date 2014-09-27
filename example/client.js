var net = require('net');
var RRSocket = require('../');

var socket = RRSocket(net.connect(3000));

socket.rep('a message', function(a, reply){
    console.log(a);
    reply('i see that...');
});

socket.req('another message', 'hello', 'world', function(answer){
    console.log(answer);
});