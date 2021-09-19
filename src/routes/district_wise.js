const express = require("express");
const axios = require("axios").default;
const router = express.Router();

const {
  baseUrl,
  stateWiseTransactionUrl,
  stateWiseUserUrl,
} = require("../constants/pulse_url");
const { isValidYear, isValidQuarter, isStateValid } = require("../validations");

router.get("/district-wise/transaction/:state/:year/:quarter", async (req, res, next) => {
  const year = req.params.year;
  const quarter = req.params.quarter;
  const state = req.params.state;

  const yearValid = isValidYear(year);
  const quarterValid = isValidQuarter(quarter);

  let stateValid = isStateValid(state);

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
        stateWiseTransactionUrl +
        `${
          !!state && state.length > 0 ? "/state/" + state + "/" : "/"
        }${year}/${quarter}.json`
    );
    res.send({
      status: "SUCCESS",
      year,
      quarter,
      state,
      data: response.data.data.hoverDataList,
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

router.get("/district-wise/user/:state/:year/:quarter", async (req, res, next) => {
  const year = req.params.year;
  const quarter = req.params.quarter;
  const state = req.params.state;

  const yearValid = isValidYear(year);
  const quarterValid = isValidQuarter(quarter);
  let stateValid = isStateValid(state);

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
        stateWiseUserUrl +
        `${
          !!state && state.length > 0 ? "/state/" + state + "/" : "/"
        }${year}/${quarter}.json`
    );
    res.send({
      status: "SUCCESS",
      year,
      quarter,
      state,
      data: response.data.data.hoverData,
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
