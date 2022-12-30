const express = require("express");
const bodyParse = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const port = 3000;

const path = require('path');

// set the view engine to ejs
app.set('ciews', path.resolve() + '/views');
app.set('view engine', 'ejs');

app.use(bodyParse.urlencoded({ extends: true }));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let itemWorks = [];

app.get("/", function (req, res) {
  let day = date.getDay();

  res.render("list", { listTitle: day, listItem: items });
  items.pop;
});

app.post("/", function (req, res) {

  let item = req.body.foodservice;
  if(res.body.list === "work"){
    console.log("-----work------");
    itemWorks.push(item);
    res.redirect("/work");    
  }else{
    items.push(item);
    res.redirect("/");
  }

  items.push(item);
  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", listItem: itemWorks });
});

app.listen(port, function (req, res) {
  console.log(`Server is running on ${port}`);
});


///asdasdasd
