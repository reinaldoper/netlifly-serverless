// src/getItems.js
import { prisma } from "./database.js";
/* const cors = require("cors"); */

const handler = async (event) => {
  const items = await prisma.employee.findMany();
  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(items),
  };
};

export { handler };


