const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('Group', GroupSchema);
