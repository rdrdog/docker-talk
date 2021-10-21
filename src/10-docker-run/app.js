const express = require('express');
const fs = require('fs');

const messageFile = "MOTD/motd.txt";
function loadMOTD() {
  if (fs.existsSync(messageFile)) {
    return fs.readFileSync(messageFile, 'utf8');
  }
  return "Hello World!"
}

const app = express();
app.get('/', (_req, res) => {
  res.json({ message: loadMOTD() });
});

module.exports = app;
