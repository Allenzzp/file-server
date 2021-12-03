const net = require("net");
const port = 3000; 
const fs = require("fs");
const server = net.createServer();
let container = "";

// fs.readFile("/vagrant/w2/d3/file-server/hello.html", (err, body) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log(body);
// });

server.on("connection", (socket) => {
  const requests = [];
  socket.setEncoding("UTF8");
  socket.write("Welcome to the file server!\n");
  socket.on("data", (data) => {
    console.log("Received message:", data);
    const request = data.split(" ");
    if (request.length < 2 || request[0] !== "GET") {
      socket.write("error!\n");
      socket.end();
      return;
    }
    let path = `${__dirname}/${request[1].replace(/^\/+/g, '').replace(/^\s+|\s+$/g, '')}`;
    
    console.log(`path: [${path}]`);

    fs.readFile(path, (err, body) => { 
      if (err) {
        console.log("error message", err.message);
        socket.write("No file found\n");
        socket.end();
        return;
      }
      socket.write(body);

    })
    //   const readerStream = fs.createReadStream(`.${data[1]}`);
    //   readerStream.setEncoding("UTF8");

    //   readerStream.on("data", (chunk) => {
    //     container += chunk;
    //   });

    //   readerStream.on("end", function(){
    //     socket.write(container);
    //     console.log("file sent");
    //   });

    //   readerStream.on('error', function(err) {
    //     console.log(err.stack);
    //  });
    // }
  });
});


server.listen(port, ()=> {
  console.log("Server listening on port 3000!");
})