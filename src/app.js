// src/app.js
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
app.use(express.json());

// 1) Command injection (dangerous)
app.get('/run', (req, res) => {
  const cmd = req.query.cmd; // untrusted input
  exec(cmd, (err, stdout) => {
    if (err) return res.status(500).send('error');
    res.send(stdout);
  });
});

// 2) SQL injection (simulated)
app.get('/user', (req, res) => {
  const id = req.query.id;
  // insecure string concatenation simulating DB query
  const query = `SELECT * FROM users WHERE id = '${id}'`;
  res.send(`query: ${query}`);
});

// 3) Reflected XSS
app.get('/search', (req, res) => {
  res.send('You searched for: ' + req.query.q);
});

// 4) eval/code injection
app.get('/calc', (req, res) => {
  const result = eval(req.query.expr); // intentionally vulnerable
  res.send('Result: ' + result);
});

// 5) Path traversal
app.get('/readfile', (req, res) => {
  const filename = req.query.file;
  fs.readFile('/var/data/' + filename, 'utf8', (err, data) => {
    if (err) return res.status(404).send('not found');
    res.send(data);
  });
});

// 6) Hardcoded credential
const DB_PASSWORD = "P@ssword1234";

// 7) Weak hashing
app.get('/hash', (req, res) => {
  const input = req.query.input || '';
  const md5 = crypto.createHash('md5').update(input).digest('hex');
  res.send(md5);
});

// 8) Insecure randomness
app.get('/otp', (req, res) => {
  const otp = Math.random().toString().substring(2, 8);
  res.send({ otp });
});

// 9) Unsafe deserialization (example)
app.post('/deserialize', (req, res) => {
  const payload = req.body.payload; // e.g. JSON string
  const obj = JSON.parse(payload); // no schema/validation
  res.json({ parsed: obj });
});

// 10) Missing auth
app.get('/admin', (req, res) => {
  res.send('admin console (no auth)');
});

app.listen(3000, () => console.log('App listening on :3000'));
