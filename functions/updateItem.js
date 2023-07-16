import { prisma } from "./database.js";
import cors from 'cors';
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: 'Content-Type', 
};

const handler = async (event) => {
  const { leaderEmail, id } = JSON.parse(event.body);

  const createdItem = await prisma.employee.update({
    where: { id: id },
    data: { leaderEmail: leaderEmail },
  });

  return {
    statusCode: 201,
    body: JSON.stringify(createdItem),
  };
};

const corsHandler = cors(corsOptions)(handler);

export { corsHandler as handler };
