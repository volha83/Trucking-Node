const Week = require("../models/Week");

const listWeeks = async (req, res) => {
  const weeks = await Week.find({ user: req.user._id }).sort({ weekFrom: 1 });

  let totalGross = 0;
  let totalProfit = 0;

  weeks.forEach((week) => {
    totalGross += week.invoiceTotal;

    totalProfit +=
      week.invoiceTotal -
      week.fuelCost -
      week.repairCost -
      week.otherExpenses -
      week.salary;
  });

  res.render("weeks", { weeks, totalGross, totalProfit });
};

const showYearSummary = async (req, res) => {
  const weeks = await Week.find({
    user: req.user._id,
    paid: true,
  });

  let totalMiles = 0;
  let totalFuelCost = 0;
  let totalRepairCost = 0;
  let totalOtherExpenses = 0;
  let totalSalary = 0;
  let totalInvoice = 0;
  let totalProfit = 0;

  weeks.forEach((week) => {
    totalMiles += week.miles;
    totalFuelCost += week.fuelCost;
    totalRepairCost += week.repairCost;
    totalOtherExpenses += week.otherExpenses;
    totalSalary += week.salary;
    totalInvoice += week.invoiceTotal;

    totalProfit +=
      week.invoiceTotal -
      week.fuelCost -
      week.repairCost -
      week.otherExpenses -
      week.salary;
  });

  res.render("summary", {
    totalMiles,
    totalFuelCost,
    totalRepairCost,
    totalOtherExpenses,
    totalSalary,
    totalInvoice,
    totalProfit,
  });
};

const showNewForm = (req, res) => {
  res.render("week", { week: null });
};

const createWeek = async (req, res) => {
  const {
    weekFrom,
    weekTo,
    miles,
    fuelCost,
    repairCost,
    otherExpenses,
    invoiceTotal,
    paid,
    notes,
  } = req.body;

  const salary = Number(invoiceTotal || 0) * 0.3;

  await Week.create({
    user: req.user._id,
    weekFrom,
    weekTo,
    miles: Number(miles || 0),
    fuelCost: Number(fuelCost || 0),
    repairCost: Number(repairCost || 0),
    otherExpenses: Number(otherExpenses || 0),
    salary,
    invoiceTotal: Number(invoiceTotal || 0),
    paid: paid === "on",
    notes,
  });

  req.flash("info", "Week created");
  res.redirect("/weeks");
};

const showEditForm = async (req, res) => {
  const week = await Week.findOne({ _id: req.params.id, user: req.user._id });

  if (!week) {
    req.flash("error", "Week not found");
    return res.redirect("/weeks");
  }

  res.render("week", { week });
};

const updateWeek = async (req, res) => {
  const {
    weekFrom,
    weekTo,
    miles,
    fuelCost,
    repairCost,
    otherExpenses,
    invoiceTotal,
    paid,
    notes,
  } = req.body;

  const salary = Number(invoiceTotal || 0) * 0.3;

  const week = await Week.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    {
      weekFrom,
      weekTo,
      miles: Number(miles || 0),
      fuelCost: Number(fuelCost || 0),
      repairCost: Number(repairCost || 0),
      otherExpenses: Number(otherExpenses || 0),
      salary,
      invoiceTotal: Number(invoiceTotal || 0),
      paid: paid === "on",
      notes,
    },
    { new: true, runValidators: true },
  );

  if (!week) {
    req.flash("error", "Week not found");
    return res.redirect("/weeks");
  }

  req.flash("info", "Week updated successfully");
  res.redirect("/weeks");
};

const deleteWeek = async (req, res) => {
  const week = await Week.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!week) {
    req.flash("error", "Week not found");
    return res.redirect("/weeks");
  }

  req.flash("info", "Week deleted");
  res.redirect("/weeks");
};

module.exports = {
  listWeeks,
  showYearSummary,
  showNewForm,
  createWeek,
  showEditForm,
  updateWeek,
  deleteWeek,
};
