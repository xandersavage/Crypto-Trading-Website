const Mailjet = require('node-mailjet');

const mj = Mailjet.apiConnect(
  process.env.MAILJET_API,
  process.env.MAILJET_SECRET
);

const sendEmail = (to, subject, text) => {
  const request = mj.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "swankylex@gmail.com",
          Name: "CoinBlazers"
        },
        To: [
          {
            Email: to,
            Name: 'Recipient Name'
          }
        ],
        Subject: subject,
        TextPart: text
      }
    ]
  });

  request.then().catch(err => {
    console.log(err.statusCode);
  });
};

const generateSupportEmail = (userFirstName, userLastName, userEmail) => {
  return `
    Dear Support Team,

    This is to inform you that the user ${userFirstName} ${userLastName} has made a payment to the wallet address provided. Please find the details below:

    - User's Name: ${userFirstName} ${userLastName}
    - User's Email: ${userEmail}

    Kindly process the payment and update the user's account accordingly.

    Thank you.

    Best regards,
    CoinBlazers
  `;
};

const generateUserEmail = (userFirstName, userLastName) => {
  return `
    Dear ${userFirstName} ${userLastName},

    Thank you for your payment. We have received your transaction and it is currently being processed.

    We will notify you once the payment has been confirmed and your account has been updated.

    Thank you for your patience.

    Best regards,
    CoinBlazers
  `;
};

const generateUserWithdrawalEmail = (userFirstName, userLastName, amount) => {
  return `
    Dear ${userFirstName} ${userLastName},

    We have received your withdrawal request of $${amount}. Your request is currently being processed.

    We will notify you once the withdrawal has been completed and the amount has been transferred to your account.

    Thank you for your patience.

    Best regards,
    CoinBlazers
  `;
};

const generateAdminWithdrawalEmail = (userFirstName, userLastName, amount) => {
  return `
    Withdrawal Request Notification

    User: ${userFirstName} ${userLastName}
    Amount: $${amount}

    The user has requested a withdrawal of $${amount}. Please process this request at your earliest convenience.

    Best regards,
    CoinBlazers System
  `;
};


module.exports = { sendEmail, generateSupportEmail, generateUserEmail, generateAdminWithdrawalEmail, generateUserWithdrawalEmail };
