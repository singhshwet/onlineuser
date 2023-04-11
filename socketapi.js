const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Add your socket.io logic here!

var onlineuser=[]
var onlineuserids=[]
// var roomno=1

io.on( "connection", function( socket ) {
    // socket.join("room-"+roomno)
    // io.sockets.in("room-"+roomno).emit("connectedroom","you are connected to room no"+roomno)


    socket.on("setcount", function(data){
        onlineuserids.push(socket.id);
        onlineuser.push(data);
        io.emit("online",onlineuser);
    })

    socket.on("disconnect",function(){
        onlineuser.splice(onlineuserids.indexOf(socket.id),1)
        onlineuserids.splice(onlineuserids.indexOf(socket.id),1)
        io.emit("online",onlineuser)
    })
   


    socket.on("msg",function(data){
      io.emit("message",data)  
    })

    socket.on('typing', function(){
        socket.broadcast.emit('typing');
    })
});
// end of socket.io logic

module.exports = socketapi;
