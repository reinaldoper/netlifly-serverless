import { prisma } from "./database.js";
import { calculateTurnover } from "./calculateTurnover.js";
import { isBetweenDates } from "./isBetweenDates.js";


const handler = async (event) => {
  const { email } = JSON.parse(event.body);
  const employees = await prisma.employee.findMany();
  const gestorAtual = employees.find(employee => employee.email === email);
  if (!gestorAtual) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "O e-mail do gestor atual não foi encontrado." }),
    };
  }

  try {
    const currentDate = new Date();
    const headcounts = [];
    const turnovers = [];

    // Iterar por cada mês
    for (let month = 1; month <= 12; month++) {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), month - 1, 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), month, 0);

      // Calcular o headcount para o mês atual
      const headcount = employees.filter(employee => {
        return (
          isBetweenDates(employee.hireDate, firstDayOfMonth, lastDayOfMonth) &&
          (employee.leaderEmail === gestorAtual.email || employee.email === gestorAtual.email) &&
          employee.status === "ativo"
        );
      }).length;

      // Calcular o turnover para o mês atual
      const turnover = calculateTurnover(gestorAtual, firstDayOfMonth, lastDayOfMonth, employees);

      // Adicionar os valores ao array de headcounts e turnovers
      headcounts.push({ month, headcount });
      turnovers.push({ month, turnover });
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify([headcounts, turnovers]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };
