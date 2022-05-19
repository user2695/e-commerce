const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Product = require("./models/product");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bcrypt = require("bcryptjs");
const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/ecomDB",
  collection: "sessions",
});

// mongoose.connect('mongodb://localhost:27017/ecomDB').then(
//     console.log('Connected to mongoose')
// );

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const authRoutes = require("./routes/auth");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect("mongodb://localhost:27017/ecomDB")
  .then(console.log("Connected to mongoose"))
  .then((result) => {
    app.listen(3000, (req, res) => {
      console.log("Listening on: 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
