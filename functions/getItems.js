// src/getItems.js
import { prisma } from "./database.js";

const handler = async (event) => {
  const items = await prisma.employee.findMany();
  return {
    statusCode: 201,
    body: JSON.stringify(items),
  };
};

export { handler };


