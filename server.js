'use strict';

const express = require('express');
const webMetaScraper = require('./src/webMetaScraper.js');

// TODO Apply Cors for application
const cors = require('cors');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

const redis = require("redis");
const PORT_REDIS = process.env.PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);
const fs = require('fs');

app.use(cors());

// Store within Redix and Server File System
const setStorage = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
  fs.appendFile('search-history.csv', `${key}, ${JSON.stringify(value)},`, function (err) { });
}

// 
const getStorage = (req, res, next) => {
  let key = req.route.path + req.query.url;
  redisClient.get(key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) {
      res.status(200).send(JSON.parse(data));
    }
    else next();
  });
}

// Health Check URL to ensure the service is running.
// TOOD add any additional logs required to perform this test
app.get('/', async (req, res) => {
  res.json({ healthCheck: 'passed' })
});

// Entry point to APIgetStorage
app.get('/api/v1/', async (req, res, next) => {
  try {
    const result = await webMetaScraper({ url: req.query.url });
    setStorage(req.route.path + req.query.url, result);
    res.json(result);
  } catch (error) {
    return next(error)
  }
});

// 
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
