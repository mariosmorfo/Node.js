const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs");

app.get('/create', (req, res) => {
  console.log("Create Page")
  res.render('form', {})
})

app.post('/user', (req, res) => {
  console.log("User Post")
  let data = req.body;
  console.log("Data", data)

  let username = req.body.username;
  let email = req.body.email;

  res.render('user',
    {
      data1: username,
      data2: email
    }
  )
})

app.get('/users', (req, res) => {
  console.log("Users page")

  const users = [
    {
      "username": "marios",
      "email": "marios.morfo@gmail.com",

    },
    {
      "username": "Nick",
      "email": "nickpop@gmail.com"
    }
  ]

  res.render('users', { users })
})

app.listen(port, () => {
  console.log("Server is up")
})

