const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./models/index");

db.sequelize.sync();

const authRouter = require("./routes/auth");
const calanderRouter = require("./routes/calander");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname + "public")));
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.use("/auth", authRouter);
app.use("/calander", calanderRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => `Server is Open ${PORT}`);
