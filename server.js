const express = require("express");
require("dotenv").config({ path: "./config.env" });
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
// use middleware
app.use(cors());
app.use(express.json());
// admin
// EMVlIx3GfZZZdeVp
//using routes

// mongodb connection

const con = require("./db/connection");

app.use(require("./routes/route"));

// listen to the http server
con
  .then((db) => {
    if (!db) return process.exit(1);
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed To Connect with HTTP Server:${err}`)
    );

    //  error in mongodb connection
  })
  .catch((error) => {
    console.log(`Connection Failed..! ${error}`);
  });
