var net = require('net');
var RRSocket = require('../');

function connection(sock){
    var socket = RRSocket(sock);

    socket.req('a message', {custom: 'test'}, function(answer){
        console.log(answer);
    });

    socket.rep('another message', function(a, b, reply){
        console.log(a, b);
        reply('ye so...');
    });
};

var server = net.createServer(connection);
server.listen(3000);