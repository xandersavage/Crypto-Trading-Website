// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ["buy", "sell"],
//     required: true
//   },
//   coin: {
//     type: String,
//     enum: ["BTC", "ETH", "LTC", "XRP"], // Enum for allowed coins
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Transaction = mongoose.model("Transaction", transactionSchema);

// module.exports = Transaction;

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    remark: {
      type: String
    },
    status: {
      type: String,
      enum: ["Ongoing", "Resolved"],
      default: "Ongoing"
    },
    type: {
      type: String,
      required: true,
      enum: ["Academic", "Non-Academic"]
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    attachments: [
      {
        data: Buffer, // Buffer to store the binary data of the image
        contentType: String // MIME type of the image
      }
    ],
    resolvedAt: {
      type: Date
    },
    author: {
      //This field EXISTS in the DB
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
