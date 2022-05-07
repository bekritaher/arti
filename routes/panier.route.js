const express = require("express");
const router = express.Router();

const PanierController = require("../controllers/panier.controller");

router.get("/ShowallCarts", PanierController.ShowallCarts);
router.post("/GetCartsbyUserid/", PanierController.GetCartsbyUserid);
//
router.post("/AddToCart", PanierController.AddToCart);
router.post("/AddToCartevent", PanierController.AddToCartevnt);
router.post("/DeleteItemFromCart", PanierController.DeleteItemFromCart);
//
router.post("/totalPrice", PanierController.totalPrice);
router.post("/getArtDetails/", PanierController.getArtDetails);
//
router.post("/incrementQuantity", PanierController.incrementQuantity);
router.post("/decrementQuantity", PanierController.decrementQuantity);
//
router.post("/decrementQuantity", PanierController.decrementQuantity);
router.post("/DeleteAllCart", PanierController.DeleteAllCart);
router.post("/getidCart", PanierController.getidCart);
router.post("/SetCartPayed", PanierController.SetCartPayed);

module.exports = router;