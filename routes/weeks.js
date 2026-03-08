const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const {
    listWeeks,
    showNewForm,
    createWeek,
    showEditForm,
    updateWeek,
    deleteWeek, } = require("../controllers/weeksController");
const auth = require("../middleware/auth");

router.get("/", auth, listWeeks);
router.get("/new", auth, showNewForm);
router.post("/", auth, createWeek);
router.get("/edit/:id", auth, showEditForm);
router.post("/update/:id", auth, updateWeek);
router.post("/delete/:id", auth, deleteWeek);

module.exports = router;