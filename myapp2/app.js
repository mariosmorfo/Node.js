const express = require('express');
const app = express;
const port = 3000;

app.get('/', (req, res) => {
  res.send('This is the home page')
})


app.post('/user', (req, res) => {
  let data = req.body;
  console.log(data);
  res.send('User page');
})

app.listen(port, () => {
  console.log('Server is up')
})