// module.exports = function storeLocals(req, res, next) {
//     res.locals.user = req.user || null;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("info");
//     next();
// };

// const storeLocals = (req, res, next) => {
//   if (req.user) {
//     res.locals.user = req.user;
//   } else {
//     res.locals.user = null;
//   }
//   res.locals.info = req.flash("info");
//   res.locals.error = req.flash("error");
//   next();
// };
// module.exports = storeLocals;

const storeLocals = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.info = req.flash("info");
  res.locals.errors = req.flash("error");
  next();
};

module.exports = storeLocals;