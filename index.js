var uuid = require('node-uuid');
var Emitter = require('events').EventEmitter;
var MSocket = require('messageable-socket');

module.exports = RRSocket;

function RRSocket(sock){
    var emitter = new Emitter;
    var socket = MSocket(sock);
    var callbacks = {};

    socket.on('message', function(){
        var args = [].slice.call(arguments);
        var meta = args.pop();

        if(meta.reply){
            callbacks[meta.id].apply(null, args);
            delete callbacks[meta.id];
            return;
        }

        args.push(reply);
        emitter.emit.apply(emitter, args);

        function reply(){
            var args = [].slice.call(arguments);
            var m = {id: meta.id, reply: true};
            args.push(m);
            socket.send.apply(socket, args);
        }
    });

    socket.req = function(){
        var args = [].slice.call(arguments);
        var meta = {id: uuid.v4(), reply: false};
        var callback = args.pop();
        callbacks[meta.id] = callback;
        args.push(meta);
        socket.send.apply(socket, args);
    };

    socket.rep = function(){
        var args = [].slice.call(arguments);
        emitter.on.apply(emitter, args);
    };

    return socket;
}