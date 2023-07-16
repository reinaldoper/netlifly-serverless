import { prisma } from "./database.js";

const handler = async (event) => {
  const items = await prisma.employee.findMany();
  
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(items),
  };
};

export { handler };
