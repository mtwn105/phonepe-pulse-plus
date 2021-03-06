const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const aggregatedRouter = require("./routes/aggregated");
const stateWiseRouter = require("./routes/state_wise");
const districtWiseRouter = require("./routes/district_wise");
const topStatesRouter = require("./routes/top_states_pincodes");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// Routers

app.use("/api/v1/", aggregatedRouter);
app.use("/api/v1/", stateWiseRouter);
app.use("/api/v1/", districtWiseRouter);
app.use("/api/v1/", topStatesRouter);

// Error Handler
function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    error: err.name,
    message: err.message,
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running");
});

module.exports = app;