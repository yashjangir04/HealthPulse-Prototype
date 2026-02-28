const express = require("express") ;
const app = express() ;
const env = require("dotenv") ;

app.use(express.urlencoded({ extended : true })) ;
app.use(express.json()) ;

env.config() ;

const PORT = process.env.PORT || 5000 ;

app.get("/health" , (req , res) => {
    return res.status(200).send({ msg : "Health: Good ✅" }) ;
}) ;

app.listen(5000 , () => {
    console.log(`Server running on PORT [${PORT}] ✅`);
}) ;