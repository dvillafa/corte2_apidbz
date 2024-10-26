const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  powerLevel: {
    type: Number,
    required: true
  },
  transformations: [String],
}, {
  timestamps: true
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
