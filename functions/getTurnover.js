import { prisma } from "./database.js";
import { calcularTurnoverEHeadcount } from "./calcularTurnoverEHeadcount.js";

const handler = async (event) => {
  const { email } = JSON.parse(event.body);
  const verification = await prisma.employee.findUnique({
    where: { email: email },
  });
  if (!verification) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Email does not exist!" }),
    };
  }

  try {
    const gestorAtual = { email: email };
    const employees = await prisma.employee.findMany();
    const headcounts = [];

    const currentDate = new Date(); 
    const promises = [];

    for (let month = 1; month <= 12; month++) {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), month - 1, 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), month, 0);

      promises.push(
        prisma.employee.count({
          where: {
            OR: [
              { leaderEmail: gestorAtual.email },
              { email: gestorAtual.email }
            ],
            hireDate: { lte: firstDayOfMonth.toISOString() },
            terminationDate: { lte: lastDayOfMonth.toISOString() }
          },
        }),
        prisma.employee.count({
          where: {
            OR: [
              { leaderEmail: gestorAtual.email },
              { email: gestorAtual.email }
            ],
            hireDate: { lte: lastDayOfMonth.toISOString() },
            terminationDate: null,
          },
        })
      );
    }

    const results = await Promise.all(promises);

    for (let i = 0; i < results.length; i += 2) {
      const employeesCountFirstDay = results[i];
      const headcountes = results[i + 1];

      const { turnover, headcountTotal } = calcularTurnoverEHeadcount(gestorAtual, employeesCountFirstDay, headcountes, employees);

      const month = i / 2 + 1; 

      headcounts.push({ month, turnover, headcountTotal });
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(headcounts),
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
