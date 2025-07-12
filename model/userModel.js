import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  eventData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  cartData: {
    type: mongoose.Schema.Types.Mixed, 
    default: {}
  }
}, { 
  timestamps: true, 
  minimize: false 
});

const User = mongoose.model("User", userSchema);

export default User;
