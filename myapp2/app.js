const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use('/', express.static('files'));
app.use(express.urlencoded({extended: true}));


const logger = (req, res, next) => {
  let url = req.url;
  console.log("Logger", req.body)
  let time = new Date();
  console.log("Received request for " + url + " at" + time)
  next()
}

app.get('/', (req, res) => {
  res.send('This is the home page')
});


app.post('/user', logger, (req, res) => {
  let data = req.body;
  let username = req.body.username;
  let email = req.body.email;
  console.log(data);
  res.send(`User data ${username}, ${email}`);
});

app.post('/userForm', (req, res) => {
  let data = req.body;
  console.log("Data", data)
  res.send("UserForm Page")
});

app.use('/user1', (req, res) => {
  console.log("User 1")
  res.send("User 1 Page")
});

app.use('/user2', (req, res) => {
  console.log("User 2")
  res.send("User 2 Page")
});

app.use('/user3/hello', (req, res) => {
  console.log("User 3 hello")
  res.send("User 3 Page hello")
});



app.listen(port, () => {
  console.log('Server is up')
});