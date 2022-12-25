const express = require("express");
const bodyParse = require("body-parser");
const path = require('path');
const date = require(path.resolve(__dirname + "/date.js"));

const app = express();
const port = 3000;

app.use(bodyParse.urlencoded({ extends: true }));


let items = ["Buy Food", "Cook Food", "Eat Food"];
let itemWorks = [];

app.get("/", function (req, res) {
  let day = date.getDay();

  res.render(path.resolve(__dirname + "/views/list.ejs"), { listTitle: day, listItem: items });
  items.pop;
});

app.post("/", function (req, res) {
  let item = req.body.foodservice;

  if(res.body.list === "work"){
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
  res.render(path.resolve(__dirname + "/views/list.ejs"), { listTitle: "Work List", listItem: itemWorks });
});

app.listen(port, function (req, res) {
  console.log(`Server is running on ${port}`);
});
