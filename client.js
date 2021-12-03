const net = require("net");
const fs = require("fs");
const conn = net.createConnection({
  host: "localhost",
  port: 3000
});
conn.setEncoding("UTF8");

conn.on("connect", () => {
  console.log("Connected to the file server.");
  conn.write(`GET /hello.html HTTP/1.1\r\n`);
  conn.write(`Host: localhost\r\n`);
  conn.write(`\r\n`);

});

conn.on("data", (data) => {
  fs.writeFile("./hello_downloaded.html", data, err => {
    if (err) {
      console.error(err);
    }
    console.log("downloaded successfully");
  });
})