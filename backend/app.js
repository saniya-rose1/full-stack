const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/authRoute");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!!!");
});

module.exports = app;