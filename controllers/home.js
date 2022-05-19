const Product = require("../models/product");

// exports.getShop = function (req, res) {
//   res.render("shop", {
//     isAuthenticated: req.session.isLoggedIn,
//   });
// };

exports.getIndex = (req, res, next) => {
    Product.find()
      .then(products => {
        res.render('index', {
          prods: products,
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("cart", {
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};
