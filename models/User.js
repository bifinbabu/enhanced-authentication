const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    profilePictureUrl: { type: String, required: false },
    bio: { type: String, required: false },
    externalAccountId: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
