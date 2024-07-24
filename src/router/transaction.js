const express = require('express');
const User = require('../model/user');
const Transaction = require('../model/transaction');
const auth = require('../middleware/auth');
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

// Route to update transaction status to "approved"
router.post('/update-transaction/:transactionId', auth, adminAuth, async (req, res) => {
  const { transactionId } = req.params;
  const { status } = req.body;

  try {
    // Find the transaction by ID
    const transaction = await Transaction.findById(transactionId).populate('user')
    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found' });
    }

    if (transaction.status === 'approved') {
      return res.status(400).send({error: 'Transaction is already approved'})
    }    

    // Update the transaction status
    transaction.status = status

    // Update the user balance id the transaction is approved
    if (status === 'approved') {
      const amount = transaction.amount
      
      if(transaction.type === 'deposit') {
        transaction.user.balance += amount
      } else if (transaction.type === 'withdrawal') {
        transaction.user.balance -= amount
      }
    }

    // Save the updated transaction
    await transaction.save();
    await transaction.user.save()

    // Respond with the updated transaction
    res.status(200).send(transaction);
  } catch (error) {
    // console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;
