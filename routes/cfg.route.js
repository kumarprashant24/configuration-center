const router = require("express").Router();
const cfg = require("../controllers/cfg.controller.js");

router.get("/", cfg.getAll);
router.get("/:serviceName", cfg.getByServiceName);
router.get("/:serviceName/:configType", cfg.getByServiceNameAndConfigType);

router.post("/:serviceName/:configType", cfg.addServiceNameandConfig);

router.put("/:id", cfg.editOne);

router.delete("/:id", cfg.delete);

module.exports = router;
