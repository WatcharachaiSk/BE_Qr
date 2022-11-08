const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// ? DB User
const db = require("./src/model/index.model");
db.sequelize.sync();

app.use("/api", require("./src/routes/index.routes.js"));

app.listen(3000, () => {
  console.log("server is running");
});
