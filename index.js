const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//use express static folder
app.use('/api', express.static(path.join(__dirname, '/src/public')))

// Set the path to the dist folder
const distPath = path.join(__dirname, '/build');
app.use(express.static(distPath));

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// ? DB User
const db = require("./src/model/index.model");
db.sequelize.sync();

app.use("/api", require("./src/routes/index.routes.js"));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(3500, () => {
  console.log("server is running");
});
