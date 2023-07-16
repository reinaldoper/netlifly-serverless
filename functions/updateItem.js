import { prisma } from "./database.js";
/* const cors = require("cors"); */

const handler = async (event) => {
  const { leaderEmail, id } = JSON.parse(event.body);

  const createdItem = await prisma.employee.update({
    where: { id: id },
    data: { leaderEmail: leaderEmail },
  });

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Max-Age": "5173"
    },
    body: JSON.stringify(createdItem),
  };
};

export { handler };
