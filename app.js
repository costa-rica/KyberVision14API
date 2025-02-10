require("dotenv").config();
const sequelize = require("./models/_connection");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var actionsRouter = require("./routes/actions");
var videosRouter = require("./routes/videos");
var groupsRouter = require("./routes/groups");
var matchesRouter = require("./routes/matches");
var playersRouter = require("./routes/players");
var scriptsRouter = require("./routes/scripts");
var syncContractsRouter = require("./routes/syncContracts");
var teamsRouter = require("./routes/teams");
var adminDbRouter = require("./routes/adminDb");

var app = express();
const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/actions", actionsRouter);
app.use("/videos", videosRouter);
app.use("/groups", groupsRouter);
app.use("/matches", matchesRouter);
app.use("/players", playersRouter);
app.use("/scripts", scriptsRouter);
app.use("/syncContracts", syncContractsRouter);
app.use("/teams", teamsRouter);
app.use("/admin-db", adminDbRouter);

// Increase payload size for large files
app.use(express.json({ limit: "6gb" }));
app.use(express.urlencoded({ limit: "6gb", extended: true }));

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database connected & synced 🚀");
  })
  .catch((error) => console.error("Error syncing database:", error));

module.exports = app;
