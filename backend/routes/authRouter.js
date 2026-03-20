const express = require("express") ;
const router = express.Router() ;
const jwt = require("jsonwebtoken") ;
const authContoller = require("../controllers/authController") ;

router.post("/signup/doctor" , authContoller.doctorSignUp) ;
router.post("/signup/patient" , authContoller.patientSignUp) ;
router.post("/signup/shop" , authContoller.shopSignUp) ;
router.post("/login" , authContoller.login) ;

module.exports = router ;