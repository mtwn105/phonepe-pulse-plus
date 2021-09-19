const express = require("express");
const axios = require("axios").default;
const router = express.Router();

const {
  baseUrl,
  stateWiseTransactionUrl,
  stateWiseUserUrl,
} = require("../constants/pulse_url");
const { isValidYear, isValidQuarter } = require("../validations");

router.get("/state-wise/transaction/:year/:quarter", async (req, res, next) => {
  const year = req.params.year;
  const quarter = req.params.quarter;

  const yearValid = isValidYear(year);
  const quarterValid = isValidQuarter(quarter);

  if (!yearValid || !quarterValid) {
    return res.status(400).send({
      status: "ERROR",
      year,
      quarter,
      state,
      error: "Invalid input parameters (year or quarter)",
    });
  }

  try {
    const response = await axios.get(
      baseUrl + stateWiseTransactionUrl + `/${year}/${quarter}.json`
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

router.get("/state-wise/user/:year/:quarter", async (req, res, next) => {
  const year = req.params.year;
  const quarter = req.params.quarter;

  const yearValid = isValidYear(year);
  const quarterValid = isValidQuarter(quarter);

  if (!yearValid || !quarterValid) {
    return res.status(400).send({
      status: "ERROR",
      year,
      quarter,
      state,
      error: "Invalid input parameters (year or quarter)",
    });
  }

  try {
    const response = await axios.get(
      baseUrl + stateWiseUserUrl + `/${year}/${quarter}.json`
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
