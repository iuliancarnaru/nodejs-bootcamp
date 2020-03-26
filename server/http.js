const http = require("http");
const url = require("url");

const PORT = 8000;

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello to overview page");
  } else if (pathName === "/product") {
    res.end("Hello to product page");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "My-custom-header": "hello-world"
    });
    res.end("<h1>Page not found...</h1>");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is listening on port ${PORT}`);
});
