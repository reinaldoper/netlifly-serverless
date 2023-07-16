import { prisma } from "./database.js";
const cors = require("cors");
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: 'Content-Type', 
};

const handler = async (event) => {
  const item = JSON.parse(event.body);

  const result = await prisma.employee.delete({
    where: { id: item.id },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

const corsHandler = cors(corsOptions)(handler);

export { corsHandler as handler };