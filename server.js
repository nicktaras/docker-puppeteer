'use strict';

const express = require('express');
const webMetaScraper = require('./src/webMetaScraper.js');
const metaKeys = require('./metaKeys.json');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/api/v1/', async (req, res, next) => {
  const url = req.query.url;
  try {
    const result = await webMetaScraper({ url: url, metaKeys });
    res.json(result)
  } catch (error) {
    return next(error)
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);