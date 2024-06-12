const express = require("express");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();
const Trader = require("../model/trader");
const User = require("../model/user");

// Route for static pages (assuming it's also in the public directory)
router.get("/", (req, res) => {
  res.sendFile("index.html");
});

// Router for pug pages
router.get("/account", auth, async(req, res) => {
  try {
    const traders = await Trader.find()
    res.status(200).render("user-dashboard", {
       traders,
       selectedTraders: req.user.selectedTraders.map(trader => trader._id.toString())
      });
  } catch (e) {
    res.status(500).send({error: 'Internal server error'})
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get('/error', (req, res) => {
  const errorMessage = req.query.message || 'An unknown error occurred.';
  res.render('error', { errorMessage });
});


router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/admin", auth, adminAuth, async (req, res) => {
  const users = await User.find();
  res
    .status(200)
    .render("admin-dashboard", { users });
});

router.get("/admin-traders", auth, adminAuth, async (req, res) => {
  const traders = await Trader.find();
  res
    .status(200)
    .render("admin-dashboard-trader", { traders });
});

module.exports = router;
