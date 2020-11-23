const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Add some text'],
  },
  team: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
