const express=require("express");
const { register, login, logout, addFeedback, allEmployees,} = require("../controller/employee");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/allemployees").get(allEmployees)
router.route("/addfeedback").post(isAuthenticated, addFeedback)

module.exports = router;