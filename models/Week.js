const mongoose = require("mongoose");

const WeekSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weekFrom: {
      type: Date,
      required: [true, "Week from date is required"],
    },
    weekTo: {
      type: Date,
      required: [true, "Week to date is required"],
    },
    miles: {
      type: Number,
      default: 0,
      min: [0, "Miles cannot be negative"],
    },
    fuelCost: {
      type: Number,
      default: 0,
      min: [0, "Fuel cost cannot be negative"],
    },
    repairCost: {
      type: Number,
      default: 0,
      min: [0, "Repair cannot be negative"],
    },
    otherExpenses: {
      type: Number,
      default: 0,
      min: [0, "Expenses cannot be negative"],
    },
    salary: {
      type: Number,
      default: 0,
      min: [0, "Salary cannot be negative"],
    },
    invoiceTotal: {
      type: Number,
      required: [true, "Invoice total is required"],
      min: [0, "Invoice total can not be negative"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [300, "Notes cannot be more than 300 characters"],
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Week", WeekSchema);
