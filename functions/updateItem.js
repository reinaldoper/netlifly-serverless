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
    },
    body: JSON.stringify(createdItem),
  };
};

export { handler };
