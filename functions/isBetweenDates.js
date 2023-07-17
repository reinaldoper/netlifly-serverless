import { convertToDate } from "./convertToDate";

const isBetweenDates = (date, startDate, endDate) => {
  const employeeDate = convertToDate(date);
  const start = convertToDate(startDate);
  const end = convertToDate(endDate);
  return employeeDate >= start && employeeDate <= end;
};


export { isBetweenDates };