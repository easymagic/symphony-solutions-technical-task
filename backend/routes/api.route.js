const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

//Category
router.get("/contacts", async (req, res, next) => {
  res.send({});
});
router.get("/contacts/:id", async (req, res, next) => {
  res.send({});
});
router.put("/contacts/:id", async (req, res, next) => {
  res.send({});
});
router.delete("/contacts/:id", async (req, res, next) => {
  res.send({});
});
router.post("/contacts", async (req, res, next) => {
  res.send({});
});

module.exports = router;
