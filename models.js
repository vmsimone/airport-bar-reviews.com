'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const airportSchema = mongoose.Schema({
  "airport": { type: String, required: true }
  // "code": { type: String, required: true }
});

// airportSchema.virtual('fullAirportName').get(function() {
//   return `${this.code} - ${this.name}`;
// });

airportSchema.methods.serialize = function() {
  return {
    id: this._id,
    airport: this.airport
  };
};

const barSchema = mongoose.Schema({
  "airport": { type: String, required: true },
  "name": { type: String, required: true },
  "location": { type: String, required: true }
});

barSchema.methods.serialize = function() {
  return {
    id: this._id,
    airport: this.airport,
    name: this.name,
    location: this.location
  };
};

const reviewSchema = mongoose.Schema({
  "airport": { type: String, required: true },
  "bar": { type: String, required: true },
  "author": { type: String, required: true },
  "title": { type: String, required: true },
  "description": { type: String, required: true },
  "date": { type: String, required: true}
});

reviewSchema.methods.serialize = function() {
    return {
      id: this._id,
      airport: this.airport,
      bar: this.bar,
      author: this.author,
      title: this.title,
      description: this.description,
      date: this.date
    };
};

const Airport = mongoose.model('Airport', airportSchema);
const Bar = mongoose.model('Bar', barSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Airport, Bar, Review };