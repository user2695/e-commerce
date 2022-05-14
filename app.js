const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')
const Product = require('./models/product');

const app = express();
mongoose.connect('mongodb://localhost:27017/ecomDB').then(
    console.log('Connected to mongoose')
);

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error")
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
app.listen(3000, function () {
    console.log("Listening on: 3000");
});