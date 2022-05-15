const Product = require('../models/product');

exports.getShop = function (req, res) {
    res.render('shop', {
        isAuthenticated: true
    })

}


exports.getCart = function (req, res) {
    res.render('cart', {
        isAuthenticated: false
    })
}