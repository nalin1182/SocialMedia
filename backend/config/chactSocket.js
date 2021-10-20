exports.chatSockets = (io)=>{

    io.on('connection', (socket) => {
        console.log('We have a new connection');
      
        //
        socket.on('join',({receiver,room},callback)=>{
          console.log(receiver+" "+room);
        
          socket.join(room);
          callback();
        })
      
        //
        socket.on('sendMessage',({sender,room,message},callback)=>{
          
          io.in(room).emit('message',{user:sender,text:message});
          callback();
        });
      
        //
        socket.on('disconnect', () => {
          console.log('User had left !!!');
        });
      
      });

} 