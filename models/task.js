var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  user_id: String
});

module.exports = mongoose.model('Task', TaskSchema);
