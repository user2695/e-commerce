const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products')
const adminController = require('../controllers/admin');

router.get('/admin-products', productsController.getAdminProducts)
router.get('/edit-product',adminController.getEditProduct);
router.post('/edit-product',adminController.postEditProduct);
router.post('/edit-product/:productId',adminController.postEditProduct);

//added
// router.get('/edit-product/:productId',adminController.getEditProduct);
router.post('/admin-products',productsController.getProducts);
router.get('/admin-products/:productId', adminController.getEditProduct);
//added today
router.get('/edit-product/:productId',adminController.getEditProduct);
router.post('/delete-product',adminController.postDeleteProduct);


module.exports = router;