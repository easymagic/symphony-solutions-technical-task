const router = require("express").Router();
const contacts = require('../models/contact');
const db = require('../models');


router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

//Category
router.get("/contacts", async (req, res, next) => {
  let Contact = contacts(db.sequelize,db.Sequelize.DataTypes);
  let one = await Contact.findOne({email:'user@domain.com'});
  // console.log(one.emailFormatted());
  // let newRec = await Contact.create({email:'user@domain.com',phone:'0909998888',name:'AKL'});
  // console.log(,'Found contacts');
  res.send({
    data:(await Contact.findAll()),
    emailFormatted: (await one.emailFormatted())
  });

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
