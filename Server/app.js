const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./Configurations/DB");
const app = express();

// router file destination
const user = require('./routes/user')

// cors
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// db connection


// parse request of content-type to application/json
app.use(bodyParser.json({ extended: false }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// URL end point
app.use("/user", user)

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})