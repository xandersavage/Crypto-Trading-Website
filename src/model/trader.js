const mongoose = require('mongoose');

const traderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  winRate: {
    type: Number,
    required: true
  },
  profitShare: {
    type: Number,
    required: true
  }
});

const Trader = mongoose.model('Trader', traderSchema);

module.exports = Trader;
