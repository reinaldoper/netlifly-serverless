// src/getItems.js
import { prisma } from "./database.js";

const getItems = async (event) => {
  const items = await prisma.employee.findMany();
  return {
    statusCode: 201,
    body: JSON.stringify(items),
  };
};

export { getItems };


