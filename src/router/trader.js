const express = require('express');
const router = express.Router();
const Trader = require('../model/trader');
const User = require('../model/user');
const auth = require('../middleware/auth')
const adminAuth = require("../middleware/adminAuth");

// Route to add a trader to user's selected traders list
router.post('/users/:userId/select-trader/:traderId', auth, async (req, res) => {
  try {
    // Extract user ID and trader ID from request parameters
    const userId = req.params.userId;
    const traderId = req.params.traderId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Find the trader by ID
    const trader = await Trader.findById(traderId);
    if (!trader) {
      return res.status(404).send({ error: 'Trader not found' });
    }

    // Check if the trader is already in the user's selected traders list
    if (user.selectedTraders.includes(traderId)) {
      return res.status(400).send({ error: 'Trader already selected' });
    }

    // Add the trader to the user's selected traders list
    user.selectedTraders.push(trader);
    await user.save();

    res.send({ message: 'Trader added to selected list' });
  } catch (error) {
    // Handle server errors
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Route to get user's selected traders
router.get('/users/:userId/selected-traders', auth, async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.userId;

    // Find the user by ID and populate the selected traders
    const user = await User.findById(userId).populate('selectedTraders');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Send the selected traders list as response
    res.send(user.selectedTraders);
  } catch (error) {
    // Handle server errors
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Route to remove a trader from user's selected traders list
router.delete('/users/:userId/deselect-trader/:traderId', auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const traderId = req.params.traderId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Check if the trader is in the user's selected traders list
    const traderIndex = user.selectedTraders.indexOf(traderId);
    if (traderIndex === -1) {
      return res.status(400).send({ error: 'Trader not found in selected list' });
    }

    // Remove the trader from the user's selected traders list
    user.selectedTraders.splice(traderIndex, 1);
    await user.save();

    res.send({ message: 'Trader removed from selected list' });
  } catch (error) {
    // Handle server errors
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Route to create a new trader
router.post('/traders', auth, adminAuth, async (req, res) => {
  try {
    const { name, winRate, profitShare } = req.body;

    const trader = new Trader({
      name,
      winRate,
      profitShare
    });

    await trader.save();
    res.status(201).send(trader);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Route to delete a trader
router.delete('/traders/:traderId', auth, adminAuth, async (req, res) => {
  try {
    const traderId = req.params.traderId;

    const deletedTrader = await Trader.findByIdAndDelete(traderId);
    console.log(deletedTrader)
    if (!deletedTrader) {
      return res.status(404).send({ error: 'Trader not found' });
    }
    res.status(200).send(deletedTrader);
  } catch (error) {
    console.error('Error deleting trader:', error); // Improved error logging
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;
