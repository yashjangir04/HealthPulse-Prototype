const User = require("../models/user-model") ;
const jwt = require("jsonwebtoken") ;
const bcrypt = require("bcrypt") ;

const generateToken = async (user , role) => {
    const payload = await sanitizeUser(user);
    const token = jwt.sign(payload , process.env.JWT_SECRET , {
        expiresIn : "7d"
    }) ;
    return token ;
}

const sanitizeUser = async (user) => {
    const { id , name , role } = user ;
    return {
        id , name , role
    } ;
}

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

exports.doctorSignUp = async (req , res) => {
    const { name , email , password , phone } = req.body ;
    if (!name || !email || !password || !phone) {
        return res.status(400).send({ msg : "Please provide all the required fields ❌" }) ;
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password , 10) ;
        const user = await User.create({
            name , email , password : hashedPassword , role : "doctor" , phone
        }) ;

        
        setTokenCookie(res , token) ;
        return res.status(201).send({ msg : "User created successfully ✅"}) ;
    } catch (error) {
        return res.status(500).send({ msg : `${error.message}❌` }) ;
    }
} ;

exports.patientSignUp = async (req , res) => {
    const { name , email , password , phone } = req.body ;
    if (!name || !email || !password || !phone) {
        return res.status(400).send({ msg : "Please provide all the required fields ❌" }) ;
    }

    try {
        const hashedPassword = await bcrypt.hash(password , 10) ;
        
        const user = await User.create({
            name , email , password : hashedPassword , role : "patient" , phone
        }) ;
        
        
        const token = await generateToken(user , user.role) ;
        
        setTokenCookie(res , token) ;
        return res.status(201).send({ msg : "User created successfully ✅"}) ;
    } catch (error) {
        return res.status(500).send({ msg : `${error.errmsg}❌` }) ;
    }
} ;

exports.shopSignUp = async (req , res) => {
    const { name , email , password , phone } = req.body ;
    if (!name || !email || !password || !phone) {
        return res.status(400).send({ msg : "Please provide all the required fields ❌" }) ;
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password , 10) ;
        const user = await User.create({
            name , email , password : hashedPassword , role : "shop" , phone
        }) ;

        const token = await generateToken(user , user.role) ;
        setTokenCookie(res , token) ;
        return res.status(201).send({ msg : "User created successfully ✅"}) ;
    } catch (error) {
        return res.status(500).send({ msg : `${error.message}❌` }) ;
    }
} ;

exports.login = async (req , res) => {
    const { email , password } = req.body ;

    if(!email || !password) {
        return res.status(400).send({ msg : "Please provide all the required fields ❌" }) ;
    }

    try {
        const existingUser = await User.findOne({ email }) ;
        if(!existingUser) {
            return res.status(404).send({ msg : "User not found ❌" }) ;
        }

        const isPasswordCorrect = await bcrypt.compare(password , existingUser.password) ;
        
        if(!isPasswordCorrect) {
            return res.status(401).send({ msg : "Incorrect password ❌" }) ;
        }
        
        console.log(isPasswordCorrect);


        const token = await generateToken(existingUser , existingUser.role) ;
        
        setTokenCookie(res , token) ;
        return res.status(200).send({ msg : "Login successful ✅" }) ;
    } catch (error) {
        return res.status(500).send({ msg : "Error logging in ❌" }) ;
    }
} ;