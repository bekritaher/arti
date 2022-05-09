const express = require("express");
const router = express.Router();

const CommandeController = require("../controllers/commande.controller");

router.get("/index", CommandeController.index);
router.get("/affich", CommandeController.affich);
router.post("/show", CommandeController.show);
router.get("/", CommandeController.index);
router.post("/AddCommande", CommandeController.AddCommande);
router.post("/delete", CommandeController.destory);
router.get("/totalCommande", CommandeController.totalCommande);
router.post("/totalCommandeByUser", CommandeController.totalCommandeByUser);
router.post("/nombreCommandeByUser", CommandeController.nombreCommandeByUser);

module.exports = router;