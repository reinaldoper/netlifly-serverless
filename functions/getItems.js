import { prisma } from "./database.js";

const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    // Resposta de preflight para o método OPTIONS
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: '',
    };
  }

  // Lógica da sua função para o método GET
  const items = await prisma.employee.findMany();
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(items),
  };
};

export { handler };
