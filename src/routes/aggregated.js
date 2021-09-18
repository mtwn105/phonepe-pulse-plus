const express = require("express");
const axios = require("axios").default;
const router = express.Router();

const {
  baseUrl,
  aggregatedTransactionUrl,
  aggregatedUserUrl,
} = require("../constants/pulse_url");
const { isValidYear, isValidQuarter } = require("../validations");

router.get("/aggregated/transaction/:year/:quarter", async (req, res, next) => {

  const year = req.params.year;
  const quarter = req.params.quarter;

  const yearValid = isValidYear(year);
  const quarterValid = isValidQuarter(quarter);

  if (!yearValid || !quarterValid) {
    return res.status(400).send({
      status: "ERROR",
      error: "Invalid input parameters (year or quarter)",
    });
  }

  try {
    const response = await axios.get(
      baseUrl + aggregatedTransactionUrl + `/${year}/${quarter}.json`
    );
    res.send({
      status: "SUCCESS",
      data: response.data.data
    });
  } catch (error) {
    console.error(error);
  }

});

router.get("/aggregated/user/:year/:quarter", async (req, res, next) => {
  const year = req.params.year;
  const quarter = req.params.quarter;

  const yearValid = isValidYear(year);
  const quarterValid = isValidQuarter(quarter);

  if (!yearValid || !quarterValid) {
    return res.status(400).send({
      status: "ERROR",
      error: "Invalid input parameters (year or quarter)",
    });
  }

  try {
    const response = await axios.get(
      baseUrl + aggregatedUserUrl + `/${year}/${quarter}.json`
    );
    res.send({
      status: "SUCCESS",
      data: response.data.data,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
