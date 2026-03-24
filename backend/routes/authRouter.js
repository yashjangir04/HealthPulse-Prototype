const express = require("express") ;
const router = express.Router() ;
const jwt = require("jsonwebtoken") ;
const authContoller = require("../controllers/authController") ;
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup/doctor" , authContoller.doctorSignUp) ;
router.post("/signup/patient" , authContoller.patientSignUp) ;
router.post("/signup/shopkeeper" , authContoller.shopkeeperSignUp) ;
router.post("/login" , authContoller.login) ;
router.post("/me" , authMiddleware , authContoller.getMe) ;
router.post("/logout" , authContoller.logout) ;

module.exports = router ;