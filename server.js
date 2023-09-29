import express from "express";
import cors from "cors";
const db = require("./app/models");
import routeConnection from "./app/routes"; // Import your route manager
const app = express();
const corsOptions = { origin: "*" };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


app.use('/', require('./app/routes')) // routes

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
