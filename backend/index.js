require("./db/conn");
// require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();

const port = 8080;
//app.use('/static', express.static('public'))
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'))

//routes
app.use("/api", require("./routes/allRoutes.js"));

app.listen(port, () => console.log(`listening on port ${port}!`))