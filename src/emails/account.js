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
          Name: "Crypto"
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
    Crypto
  `;
};

const generateUserEmail = (userFirstName, userLastName) => {
  return `
    Dear ${userFirstName} ${userLastName},

    Thank you for your payment. We have received your transaction and it is currently being processed.

    We will notify you once the payment has been confirmed and your account has been updated.

    Thank you for your patience.

    Best regards,
    Crypto
  `;
};

module.exports = { sendEmail, generateSupportEmail, generateUserEmail };
