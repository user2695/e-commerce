const Product = require('../models/product');


exports.getAddProduct = function (req, res) {
    res.render('add-product', {
        editing: false
    })
}


exports.postAddProduct = function (req, res) {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    });
    product.save().then((result) => {
        console.log('Added the product');
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
    });
}

exports.getProducts = function (req, res) {
    Product.find()
        .then(products => {
            res.render('products', {
                prods: products,
            });
        }).catch(err => {
            console.log(err);
        });
};

exports.getProduct = function (req, res) {
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            res.render('details', {
                product: product
            });
        }).catch(err => {
            console.log(err);
        });
}


exports.getAdminProducts = function (req, res) {
    Product.find()
        .then(products => {
            res.render('admin-products', {
                prods: products,
            });
        }).catch(err => {
            console.log(err);
        });
   
}