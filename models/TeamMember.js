const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Add some text'],
  },
  teams: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
