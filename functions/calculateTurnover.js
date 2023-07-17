import { isBetweenDates } from "./isBetweenDates";

const calculateTurnover = (gestorAtual, startDate, endDate, employees) => {
  // Filtrar os funcionários com o mesmo email do gestor atual
  const filteredEmployees = employees.filter(employee => employee.leaderEmail === gestorAtual.email);

  // Contar o número total de funcionários
  const totalEmployees = filteredEmployees.length;

  // Filtrar os funcionários contratados ou demitidos dentro do período desejado
  const employeesHired = filteredEmployees.filter(employee =>
    isBetweenDates(employee.hireDate, startDate, endDate)
  );
  const employeesTerminated = filteredEmployees.filter(employee =>
    employee.terminationDate && isBetweenDates(employee.terminationDate, startDate, endDate)
  );

  // Contar o número de admissões e demissões
  const totalTerminated = employeesTerminated.length;

  // Calcular o turnover
  const turnover = (totalTerminated / totalEmployees) * 100;

  return turnover;
};

export { calculateTurnover }