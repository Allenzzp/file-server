const net = require("net");
const port = 3000; 
const fs = require("fs");
const server = net.createServer();
let container = "";

server.on("connection", (socket) => {
  socket.setEncoding("UTF8");
  socket.write("Welcome to the file server!\n");
  socket.on("data", (data) => {
    // data = data.split(" ");
    console.log("Received message:", data);

    if (data[0] === "GET") {
      const readerStream = fs.createReadStream(`.${data[1]}`);
      readerStream.setEncoding("UTF8");

      readerStream.on("data", (chunk) => {
        container += chunk;
      });

      readerStream.on("end", function(){
        socket.write(container);
        console.log("file sent");
      });

      readerStream.on('error', function(err) {
        console.log(err.stack);
     });
    }
  });
});


server.listen(port, ()=> {
  console.log("Server listening on port 3000!");
})