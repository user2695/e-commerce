const express = require("express");

const homeController = require("../controllers/home");
const productsController = require("../controllers/products");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", homeController.getIndex);
router.get("/add-product", isAuth, productsController.getAddProduct);
router.post("/add-product", isAuth, productsController.postAddProduct);
router.get("/products/:productId", productsController.getProduct);
router.get("/products", productsController.getProducts);
router.get("/cart", isAuth, homeController.getCart);
router.post("/cart", isAuth, homeController.postCart);

router.get("/details", isAuth, productsController.getDetails);

module.exports = router;
