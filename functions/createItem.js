import { prisma } from "./database.js";

const handler = async (event) => {
  const item = JSON.parse(event.body);

  const createdItem = await prisma.employee.create({
    data: item,
  });

  return {
    statusCode: 201,
    body: JSON.stringify(createdItem),
  };
};

export { handler };