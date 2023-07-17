
const calculateTurnover = (gestorAtual, firstDayOfMonth, lastDayOfMonth) => {
  // Filtrar os funcionários liderados diretamente pelo gestor atual
  const lideradosDiretos = employees.filter(employee => employee.leaderEmail === gestorAtual.email);

  // Filtrar os funcionários liderados indiretamente pelo gestor atual
  const lideradosIndiretos = employees.filter(employee => lideradosDiretos.includes(employee.leaderEmail));

  // Filtrar os funcionários contratados no período
  const employeesHired = employees.filter(employee =>
    isBetweenDates(employee.hireDate, firstDayOfMonth, lastDayOfMonth)
  );

  // Filtrar os funcionários que encerraram o contrato no período
  const employeesTerminated = employees.filter(employee =>
    isBetweenDates(employee.terminationDate, firstDayOfMonth, lastDayOfMonth)
  );

  // Calcular o turnover considerando os funcionários contratados e encerrados no período
  const turnover = (employeesTerminated.length / employeesHired.length) * 100;

  return turnover;
};

export { calculateTurnover }