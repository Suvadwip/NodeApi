const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const port = process.env.PORT || 7000;
const dbDriver = process.env.MONGO_DB_URL;
const router = require("./routes/routes");
app.use("/api", router);

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log("db is connected");
      console.log(`server is running @ http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("db is not connected");
  });
