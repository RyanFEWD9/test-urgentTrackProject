//red text for waitTime above 2hrs
export const isWaitTimeOverTwoHours = (waitTime) => {
  // This regular expression matches "超過" followed by one or more digits and then "小時"
  const overHoursRegex = /超過\s*(\d+)\s*小時/;
  const match = waitTime.match(overHoursRegex);

  if (match) {
    // Extract the number and convert it to an integer
    const hours = parseInt(match[1], 10);
    // Check if the extracted hours are greater than or equal to 2
    return hours >= 2;
  }

  return false;
};
