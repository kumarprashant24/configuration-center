const router = require("express").Router();
const cfg = require("../controllers/cfg.controller.js");

router.get("/jurisdictions", cfg.getJurisdictions);
router.get("/market-types", cfg.getMarkets);
router.get("/menu", cfg.getMenu);
router.use("/config", require("../routes/cfg.route"));

module.exports = router;
