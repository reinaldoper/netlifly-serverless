// src/getItems.js
import { prisma } from "./database.js";
import cors from 'cors';
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: 'Content-Type', 
};

const handler = async (event) => {
  const items = await prisma.employee.findMany();
  return {
    statusCode: 201,
    body: JSON.stringify(items),
  };
};

const corsHandler = cors(corsOptions)(handler);

export { corsHandler as handler };


