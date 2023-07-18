import { prisma } from "./database.js";
import { calcularHeadcount } from "./calcularHeadcount.js";
import { calcularTurnover } from "./calcularTurnover.js";


const handler = async (event) => {
  const { email } = JSON.parse(event.body);
  const verification = await prisma.employee.findUnique({
    where: { email: email },
  });
  if (!verification) {
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
    const gestorAtual = { email: email };
    const result = await prisma.employee.findMany();
    const employee = result.filter(employee => employee.leaderEmail === gestorAtual.email);
    const inside = employee.filter(employee => employee.status === "ativo");
    const outside = employee.filter(employee => employee.status === "inativo");
    const total = inside.length + outside.length

    const ativos = [];
    inside.filter((data) => {
      ativos.push(data.hireDate);
    });

    const inativos = [];

    outside.filter((data) => {
      inativos.push(data.terminationDate);
    });
    const turnover = calcularTurnover(ativos, inativos, total);
    const head = calcularHeadcount(ativos, inativos, total);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({data: [employee, [{ turnoverMesAmes: turnover }],  [{headMesAmes: head} ], total]}),
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
