const cron = require("node-cron");
const User = require("../model/user");

// Constants for balance range and threshold
const MIN_BALANCE = 500;
const MAX_BALANCE = 150000;
const BALANCE_THRESHOLD = 500;

// Function to generate a random balance within the range
const generateRandomBalance = () => {
  return (
    Math.floor(Math.random() * (MAX_BALANCE - MIN_BALANCE + 1)) + MIN_BALANCE
  );
};

// Function to update user balances
const updateBalances = async () => {
  try {
    // Retrieve all user accounts
    const users = await User.find();

    // Update balances for each user
    for (const user of users) {
      if (user.autoUpdateBalance) {
        let newBalance = generateRandomBalance();
        newBalance = Math.max(newBalance, BALANCE_THRESHOLD);
        user.balance = newBalance;
        await user.save();
      }
    }

    console.log("User balances updated successfully");
  } catch (error) {
    console.error("Error updating user balances:", error);
  }
};

// Scheduled task to update user balances every hour
const hourlyBalanceUpdateTask = () => {
  cron.schedule("*/5 * * * *", async () => {
    await updateBalances();
  });
};

module.exports = hourlyBalanceUpdateTask;
