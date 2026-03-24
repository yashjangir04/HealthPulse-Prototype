const dotenv = require("dotenv") ;
dotenv.config() ;

const express = require("express") ;
const app = express() ;
const cookieParser = require("cookie-parser") ;
const cors = require("cors") ;

const db = require("./config/db-config") ;
const authRouter = require("./routes/authRouter") ;

const authMiddleware = require("./middlewares/authMiddleware") ;

app.use(express.urlencoded({ extended : true })) ;
app.use(express.json()) ;
app.use(cookieParser()) ;

app.use(cors({
    origin : "http://localhost:5173" ,
    credentials : true
}))

const PORT = process.env.PORT || 5000 ;

// Main Routes
app.use("/api/auth" , authRouter) ;

// Default Routes
app.get("/health" , (req , res) => {
    return res.status(200).send({ msg : "Health: Good ✅" }) ;
}) ;

app.listen(PORT , () => {
    console.log(`Server running on PORT [${PORT}] ✅`);
}) ;