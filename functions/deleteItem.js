import { prisma } from "./database.js";
import cors from 'cors';

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

module.exports.handler = cors()(handler);