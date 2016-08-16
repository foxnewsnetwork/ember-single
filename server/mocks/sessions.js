var session = {
  type: 'sessions',
  id: 'singleton',
  attributes: {
    admin: false,
    username: 'xXxSSJVegaXxX'
  }
};

/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var sessionRouter = express.Router();

  sessionRouter.get('/', function(req, res) {
    res.send({
      'data': session
    });
  });

  sessionRouter.post('/', function(req, res) {
    session = req.body.data;
    res.send({ 'data': session });
  });

  sessionRouter.put('/', function(req, res) {
    session = req.body.data;
    res.send({ 'data': session });
  });

  sessionRouter.delete('/', function(req, res) {
    session = {};
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  app.use('/api/sessions', require('body-parser').json());
  app.use('/api/sessions', sessionRouter);
};
