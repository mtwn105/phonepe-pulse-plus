const express = require("express");
const axios = require("axios").default;
const router = express.Router();

const {
  baseUrl,
  aggregatedTransactionUrl,
  aggregatedUserUrl,
} = require("../constants/pulse_url");
const { isValidYear, isValidQuarter, isStateValid } = require("../validations");

router.get("/aggregated/transaction/:year/:quarter", async (req, res, next) => {
  const year = req.params.year;
  const quarter = req.params.quarter;
  const state = req.query.state;

  const yearValid = isValidYear(year);
  const quarterValid = isValidQuarter(quarter);

  let stateValid = true;

  if (!!state && state.length > 0) {
    stateValid = isStateValid(state);
  }

  if (!yearValid || !quarterValid || !stateValid) {
    return res.status(400).send({
      status: "ERROR",
      year,
      quarter,
      state,
      error: "Invalid input parameters (year or quarter or state)",
    });
  }

  try {
    const response = await axios.get(
      baseUrl +
        aggregatedTransactionUrl +
        `${
          !!state && state.length > 0 ? "/state/" + state + "/" : "/"
        }${year}/${quarter}.json`
    );
    res.send({
      status: "SUCCESS",
      year,
      quarter,
      state,
      data: response.data.data,
    });
  } catch (error) {
    res.status(404).send({
      status: "ERROR",
      year,
      quarter,
      state,
      error: "Data for given time not found.",
    });
  }
});

router.get("/aggregated/user/:year/:quarter", async (req, res, next) => {
  const year = req.params.year;
  const quarter = req.params.quarter;
  const state = req.query.state;

  const yearValid = isValidYear(year);
  const quarterValid = isValidQuarter(quarter);
  let stateValid = true;

  if (!!state && state.length > 0) {
    stateValid = isStateValid(state);
  }

  if (!yearValid || !quarterValid || !stateValid) {
    return res.status(400).send({
      status: "ERROR",
      year,
      quarter,
      state,
      error: "Invalid input parameters (year or quarter or state)",
    });
  }

  try {
    const response = await axios.get(
      baseUrl +
        aggregatedUserUrl +
        `${
          !!state && state.length > 0 ? "/state/" + state + "/" : "/"
        }${year}/${quarter}.json`
    );
    res.send({
      status: "SUCCESS",
      year,
      quarter,
      state,
      data: response.data.data,
    });
  } catch (error) {
    res.status(404).send({
      status: "ERROR",
      year,
      quarter,
      state,
      error: "Data for given time not found.",
    });
  }
});

module.exports = router;
