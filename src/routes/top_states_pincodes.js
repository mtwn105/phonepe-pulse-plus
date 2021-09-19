const express = require("express");
const axios = require("axios").default;
const router = express.Router();

const {
  baseUrl,
  topTransactionUrl,
  topUserUrl,
} = require("../constants/pulse_url");
const { isValidYear, isValidQuarter } = require("../validations");

router.get("/top/transaction/:year/:quarter", async (req, res, next) => {
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
        topTransactionUrl +
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

router.get("/top/user/:year/:quarter", async (req, res, next) => {
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
        topUserUrl +
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
