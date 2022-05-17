const Product = require('../models/product');

exports.getShop = function (req, res) {
    res.render('shop', {
        isAuthenticated: req.session.isLoggedIn,
    })

}


exports.getCart = function (req, res) {
    res.send('cart',{
        isAuthenticated:true
    })
}