const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/,
        "Please provide valid email",
      ],
    },
    passwordHash: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
