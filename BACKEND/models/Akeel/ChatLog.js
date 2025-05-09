const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: String,
  userMessage: String,
  botReply: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatLog', chatSchema);
