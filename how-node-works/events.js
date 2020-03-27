const EventEmitter = require('events');
const http = require('http');

// * Observer pattern
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmmiter = new Sales();

myEmmiter.on('newSale', () => console.log('There was a new sale'));
myEmmiter.on('newSale', () => console.log('Customer name: Iulian'));
myEmmiter.on('newSale', stock => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmmiter.emit('newSale', 9);

/*
 * Using http in Observer pattern way
 */

const server = http.createServer();

server.on('request', (req, res) => {
  console.log(req.url);

  console.log(`Request received`);
  res.end(`Request received`);
});

server.on('request', (req, res) => {
  console.log(`Another Request received`);
});

server.on('close', (req, res) => {
  console.log(`Server closed`);
});

server.listen(8000, '127.0.0.1', () => console.log(`Waiting for requests...`));
