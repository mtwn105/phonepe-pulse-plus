const validator = require("validator");

isValidYear = (year) => {
  const validLength = year.length == 4;
  const validNumeric = validator.isNumeric(year);

  return validLength && validNumeric;
};

isValidQuarter = (quarter) => {
  const validLength = quarter.length == 1;
  const validNumeric = validator.isNumeric(quarter);

  return validLength && validNumeric;
};

module.exports = {
  isValidYear,
  isValidQuarter,
};
