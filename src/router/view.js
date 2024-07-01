const path = require("path");
const express = require("express");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();
const Trader = require("../model/trader");
const User = require("../model/user");

// Route for static pages (assuming it's also in the public directory)
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', "about.html"));
});

router.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', "services.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', "contact.html"));
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

router.get('/traders', auth, async(req, res) => {
  try {
    const traders = await Trader.find()
    res.status(200).render('traders', {
      traders,
      selectedTraders: req.user.selectedTraders.map(trader => trader._id.toString())
    })
  } catch (e) {
    res.status(500).send({
      error: e
    })
  }
})

router.get("/signup", (req, res) => {
  res.render("signup");
});

// router.get('/error', (req, res) => {
//   const errorMessage = req.query.message || 'An unknown error occurred.';
//   res.render('error', { errorMessage });
// });


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

router.get("/user-profile", auth, async(req, res) => {
  res.status(200).render("user-profile")
});

router.get("/withdraw", auth, async(req, res) => {
  res.status(200).render("withdraw")
});

router.get("/deposit", auth, async(req, res) => {
  res.status(200).render("deposit")
});

router.get("/confirm-message", auth, async(req, res) => {
  res.status(200).render("email")
});

router.get("/confirm-deposit", auth, async(req, res) => {
  res.status(200).render("confirm-deposit")
});

module.exports = router;
