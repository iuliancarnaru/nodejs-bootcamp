const http = require("http");

const PORT = 8000;

const server = http.createServer((req, res) => {
  res.end("Hello form the server");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is listening on port ${PORT}`);
});
