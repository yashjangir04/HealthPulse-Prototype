const dotenv = require("dotenv") ;
dotenv.config() ;

const express = require("express") ;
const app = express() ;
const cookieParser = require("cookie-parser") ;
const cors = require("cors") ;
const { Server } = require("socket.io") ;
const { createServer } = require("http") ;

const db = require("./config/db-config") ;
const authRouter = require("./routes/authRouter") ;
const communicationRouter = require("./routes/communicationRouter") ;
const appointmentRouter = require("./routes/appointmentRouter") ;

const server = createServer(app) ;
const socketHandler = require("./socket/socketHandler") ;

const io = new Server(server , {
    cors : {
        origin : "http://localhost:5173",
        methods : ["GET" , "POST"] ,
        credentials : true
    }
}) ;

app.use(express.urlencoded({ extended : true })) ;
app.use(express.json()) ;
app.use(cookieParser()) ;

app.use(cors({
    origin : "http://localhost:5173" ,
    credentials : true
}))

const PORT = process.env.PORT || 5000 ;

// Handle Socket.io stuff in separate file
socketHandler(io) ;

// Main Routes
app.use("/api/auth" , authRouter) ;
app.use("/api/communicate" , communicationRouter) ;
app.use("/api/appointments" , appointmentRouter) ;

// Default Routes
app.get("/health" , (req , res) => {
    return res.status(200).send({ msg : "Health: Good ✅" }) ;
}) ;

server.listen(PORT , () => {
    console.log(`Server running on PORT [${PORT}] ✅`);
}) ;