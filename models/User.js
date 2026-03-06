const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: [true, "Name is required"], minlength: 2, maxlength: 50
        },
        email: {
            type: String, required: [true, "Email is required"], unique: true, lowercase: true
        },
         passwordHash: {
            type: String, required: [true, "Password is required"]
        },
    },
    { timestamps: true }

);
module.exports = mongoose.model("User", UserSchema);