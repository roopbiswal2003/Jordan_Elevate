const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGODB_URL);

global.__basedir = __dirname;
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});
mongoose.connection.on("error", (error) => {
  console.log("Some error occured while connecting to data");
});

require("./models/user_model");
require("./models/post_model");

app.use(cors());
app.use(express.json());

// registering user schema
app.use(require("./routes/user_route"));
app.use(require("./routes/post_route"));
app.use(require("./routes/file_route"));

app.listen(PORT, () => {
  console.log("Server started");
});
