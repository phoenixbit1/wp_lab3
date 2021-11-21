const express = require("express");
//creating app
const app = express();
// using JSON and URL Encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//send the index.html when receiving HTTP GET /
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});
const session = require('express-session');
app.use(session({secret: 'some secret code'}));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index"); //no need for ejs extension
});
//pass requests to the router middleware
const router = require('./routes/apis');
app.use(router);
app.get("/contacts", (req, res) => {
  res.render("contacts");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Cart app listening at http://localhost:${port}`);
});


