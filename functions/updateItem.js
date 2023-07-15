import { prisma } from "./database.js";

const updateItem = async (event) => {
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

export { updateItem };
