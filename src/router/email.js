const express = require('express');
const User = require('../model/user')
const { sendEmail, generateUserEmail, generateSupportEmail } = require('../emails/account')
const auth = require('../middleware/auth')
const router = express.Router();

router.post('/send-transaction-email', auth, async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const userMessage = generateUserEmail(user.firstName, user.lastName);
    const adminMessage = generateSupportEmail(user.firstName, user.lastName, user.email);

    // Send emails
    // await sendEmail(user.email, "Payment Received and Processing" ,userMessage); //user email
    // await sendEmail("xanderarts99@gmail.com", "User Payment Notification", adminMessage); // support email

    res.status(200).send({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
})

module.exports = router;