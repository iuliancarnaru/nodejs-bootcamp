const fs = require('fs');
const express = require('express');

const app = express();

// express middleware to use req.body
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id'
    });
  }

  const tour = tours.find(item => item.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const id = tours[tours.length - 1].id + 1;
  // const tour = Object.assign({ id }, req.body);
  const tour = { id, ...req.body };
  tours.push(tour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour
        }
      });
    }
  );
});

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () =>
  console.log(`App runnind and listening on port ${PORT}`)
);
