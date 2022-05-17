const Product = require('../models/product');

exports.getEditProduct = function (req, res) {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('edit-product', {
                editing: editMode,
                product: product,
                isAuthenticated: req.session.isLoggedIn,
            });

        })
        .catch(err => console.log(err));
};


exports.postEditProduct = (function (req, res) {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescripiton = req.body.description;

    Product.findById(prodId).then(product => {
                product.title = updatedTitle;
                product.price = updatedPrice,
                product.imageUrl = updatedImageUrl,
                product.description = updatedDescripiton;
            return product.save();
        })
        .then(result => {
            console.log('Updated Product');
            res.redirect('products');
        })
        .catch(err => {
            console.log(err);
        });
});

exports.postDeleteProduct = function (req, res) {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log("Deleted Product");
            res.redirect('/products')
        })
        .catch(err => console.log(err));
};