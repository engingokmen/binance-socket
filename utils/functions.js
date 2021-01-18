function compareValues() {
  let previousValue = "0";
  return (value) => {
    if (value !== previousValue) {
      previousValue = value;
      return false;
    } else {
      return true;
    }
  };
}

const isEqualWithPrevious = compareValues();

function compareTimes() {
  let start = Date.now();
  return (min = 3000) => {
    const end = Date.now();
    const elapsed = end - start;
    if (elapsed > min) {
      start = Date.now();
      return true;
    } else {
      return false;
    }
  };
}

const isGreaterThanMinElapsedTime = compareTimes();

module.exports = { isEqualWithPrevious, isGreaterThanMinElapsedTime };
