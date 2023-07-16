// src/getItems.js
import { prisma } from "./database.js";
/* const cors = require("cors"); */

const handler = async (event) => {
  const items = await prisma.employee.findMany();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    body: JSON.stringify(items),
  };
};

export { handler };


