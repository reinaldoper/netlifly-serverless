
const calcularTurnoverEHeadcount = (gestorAtual, employeesCountFirstDay, headcount, employees) => {
  const lideradosDiretos = employees.filter(employee => employee.leaderEmail === gestorAtual.email);
  const lideradosIndiretos = getLideradosIndiretos(gestorAtual, employees);
  const turnover = (lideradosDiretos.length + lideradosIndiretos.length) > 0 ? (employeesCountFirstDay / (headcount + employeesCountFirstDay)) * 100 : 0;
  const headcountTotal = lideradosDiretos.length + lideradosIndiretos.length;

  return { turnover, headcounts: headcountTotal };
}

const  getLideradosIndiretos = (gestor, employees) => {
  const lideradosIndiretos = [];
  for (const employee of employees) {
    if (employee.leaderEmail !== gestor.email) {
      continue;
    }

    const subordinates = employees.filter(emp => emp.leaderEmail === employee.email);
    lideradosIndiretos.push(...subordinates);
  }

  return lideradosIndiretos;
}

export { calcularTurnoverEHeadcount }