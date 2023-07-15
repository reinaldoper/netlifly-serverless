import { prisma } from "./database.js";
import { calcularTurnoverEHeadcount } from "./calcularTurnoverEHeadcount.js";

const getTurnover = async (event) => {
  const { email } = JSON.parse(event.body);
  const verification = await prisma.employee.findUnique({
    where: { email: email},
  });
  if (!verification){
    return {
      statusCode: 404,
      body: JSON.stringify({ error: " Emails is not exists!" }),
    };
  }
  try {
    const gestorAtual = { email }; 
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const employeesCountFirstDay = await prisma.employee.count({
      where: {
        OR: [
          { leaderEmail: gestorAtual.email }, 
          { email: gestorAtual.email } 
        ],
        hireDate: { lte: firstDayOfMonth.toISOString().split('T')[0] },
        terminationDate: { lte: lastDayOfMonth.toISOString().split('T')[0] }
      },
    });
    
    const headcount = await prisma.employee.count({
      where: {
        OR: [
          { leaderEmail: gestorAtual.email },
          { email: gestorAtual.email } 
        ],
        hireDate: { lte: lastDayOfMonth.toISOString().split('T')[0] },
        terminationDate: null,
      },
    });

    const employees = await prisma.employee.findMany();
    const { turnover } = calcularTurnoverEHeadcount(gestorAtual, employeesCountFirstDay, headcount, employees);


    return {
      statusCode: 200,
      body: JSON.stringify(turnover),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { getTurnover };
