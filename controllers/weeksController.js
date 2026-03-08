const Week = require("../models/Week");

const listWeeks = async (req, res) => {
  const weeks = await Week.find({ user: req.user._id }).sort({ weekFrom: -1 });

  let totalGross = 0;
  weeks.forEach((week) => {
    totalGross += week.invoiceTotal;
  });

  res.render("weeks", { weeks, totalGross });
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
  showNewForm,
  createWeek,
  showEditForm,
  updateWeek,
  deleteWeek,
};
