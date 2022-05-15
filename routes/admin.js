const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products')
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');

router.get('/admin-products',isAuth, productsController.getAdminProducts)
router.get('/edit-product',isAuth,adminController.getEditProduct);
router.post('/edit-product',isAuth,adminController.postEditProduct);
router.post('/edit-product/:productId',isAuth,adminController.postEditProduct);
router.post('/admin-products',productsController.getProducts);
router.get('/admin-products/:productId',isAuth, adminController.getEditProduct);
router.get('/edit-product/:productId',isAuth,adminController.getEditProduct);
router.post('/delete-product',isAuth,adminController.postDeleteProduct);


module.exports = router;