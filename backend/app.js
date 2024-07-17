const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/user');
const Product = require('./models/mongodb');

const app = express();
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, resp) => {
  const article = await Product.find();
  
    resp.render("index",{article:article});
});



app.use('/article', router);

app.listen(1300);


