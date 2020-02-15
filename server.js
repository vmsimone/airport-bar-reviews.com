'use strict';

const express = require('express');
const mongoose = require('mongoose');

// currently causes issues
// mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.Promise = global.Promise;


const { PORT, DATABASE_URL } = require('./config');
const { Airport, Bar, Review } = require('./models');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', (_req,res) => { 
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/airports', (_req, res) => {
  Airport
    .find()
    .then(review => {
      res.json({
        reviews: review.map(
          (review) => review.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/api/bars', (_req, res) => {
  Bar
    .find()
    .then(review => {
      res.json({
        reviews: review.map(
          (review) => review.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/api/reviews', (_req, res) => {
  Review
    .find()
    .then(review => {
      res.json({
        reviews: review.map(
          (review) => review.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/api/reviews', (req, res) => {
    //include any additional keys you're expecting
    const requiredKeys = ['airport', 'bar', 'title', 'description', 'date'];
    for (let i = 0; i < requiredKeys.length; i++) {
        const key = requiredKeys[i];
        if (!(key in req.body)) {
            const message = `Missing \`${key}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

  Review.create({
    airport: req.body.airport,
    bar: req.body.bar,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  })
  .then(Review => res.status(201).json(Review.serialize()))
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.put('/api/reviews/:id', (req, res) => {
  if(!(req.body.id)) {
    res.status(400).json({
      error: 'Request body does not contain id'
    });
  }

  if (!(req.params.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableKeys = ['title', 'description'];

  updateableKeys.forEach(key => {
    if (key in req.body) {
      console.log(key);
      updated[key] = req.body[key];
    }
  });

  Review
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.delete('/api/reviews/:id', (req, res) => {
  Review
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: `${req.params.id} removed` });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'});
    });
});

app.use('*', function (_req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
