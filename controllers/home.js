const Product = require('../models/product');

exports.getShop = function (req, res) {
    res.render('shop');
}


exports.getCart = function (req, res) {
    res.render('cart')
}