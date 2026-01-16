import mongoose from 'mongoose';

const BearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('Bear', BearSchema);
