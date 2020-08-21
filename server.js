'use strict';

const express = require('express');
const webMetaScraper = require('./src/webMetaScraper.js');

const cors = require('cors');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  res.json({ healthCheck: 'passed' })
});

app.get('/api/v1/', async (req, res, next) => {
  try {
    const result = await webMetaScraper({ url: req.query.url });
    res.json(result);
  } catch (error) {
    return next(error)
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);