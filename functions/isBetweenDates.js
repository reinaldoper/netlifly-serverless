const isBetweenDates = (date, startDate, endDate) => {
  const employeeDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return employeeDate >= start && employeeDate <= end;
};


export { isBetweenDates };