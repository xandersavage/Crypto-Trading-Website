const mongoose = require("mongoose");

// Helper function to format amount with commas
const formatAmount = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Helper function to format date nicely
const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: true
  },
  amount: {
    type: String, // Store the formatted amount as a string
    required: true,
    get: formatAmount,
    set: formatAmount
  },
  date: {
    type: String, // Store the formatted date as a string
    required: true,
    default: () => formatDate(new Date())
  }
});

// Ensure getters are applied
transactionSchema.set('toJSON', { getters: true });
transactionSchema.set('toObject', { getters: true });

// Apply formatting before saving
transactionSchema.pre('save', function (next) {
  this.amount = formatAmount(this.amount);
  this.date = formatDate(new Date(this.date));
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
