const validator = require("validator");
const states = require("./constants/states");


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

isStateValid = (state) => {

  return states.includes(state);

}

module.exports = {
  isValidYear,
  isValidQuarter,
  isStateValid,
};
