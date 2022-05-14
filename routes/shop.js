const express = require('express');

const homeController = require('../controllers/home')
const productsController = require('../controllers/products')

const router = express.Router();

router.get('/', homeController.getShop);
router.get('/add-product', productsController.getAddProduct);
router.post('/add-product',productsController.postAddProduct);

// changed products/prodId
router.get('/products/:productId',productsController.getProduct);

router.get('/products',productsController.getProducts);
router.get('/cart', homeController.getCart);


module.exports = router;