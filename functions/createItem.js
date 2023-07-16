import { prisma } from "./database.js";
/* const cors = require("cors"); */

const handler = async (event) => {
  const item = JSON.parse(event.body);

  const createdItem = await prisma.employee.create({
    data: item,
  });

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createdItem),
  };
};

export { handler };