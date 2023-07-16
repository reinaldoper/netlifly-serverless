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
    const gestorAtualEmail = email; 

    const employees = await prisma.employee.findMany();
    const headcounts = [];

    const monthsWithRecords = new Set();

    employees.forEach(employee => {
      if (employee.leaderEmail === gestorAtualEmail || employee.email === gestorAtualEmail) {
        const hireDate = new Date(employee.hireDate);
        const month = hireDate.getMonth() + 1; 
        monthsWithRecords.add(month);
      }
    });

    for (const month of monthsWithRecords) {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), month - 1, 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), month, 0);

      const employeesCountFirstDay = await prisma.employee.count({
        where: {
          OR: [
            { leaderEmail: gestorAtualEmail },
            { email: gestorAtualEmail }
          ],
          hireDate: { lte: firstDayOfMonth.toISOString().split('T')[0] },
          terminationDate: { lte: lastDayOfMonth.toISOString().split('T')[0] }
        },
      });

      const headcountes = await prisma.employee.count({
        where: {
          OR: [
            { leaderEmail: gestorAtualEmail },
            { email: gestorAtualEmail }
          ],
          hireDate: { lte: lastDayOfMonth.toISOString().split('T')[0] },
          terminationDate: null,
        },
      });

      const { turnover, headcountTotal } = calcularTurnoverEHeadcount(gestorAtualEmail, employeesCountFirstDay, headcountes, employees);

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
