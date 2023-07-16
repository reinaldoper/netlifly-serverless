// src/getItems.js
import { prisma } from "./database.js";
import cors from 'cors';

const handler = async (event) => {
  const items = await prisma.employee.findMany();
  return {
    statusCode: 201,
    body: JSON.stringify(items),
  };
};

const corsHandler = cors()(handler);

export { corsHandler as handler };


