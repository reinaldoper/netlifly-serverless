import { prisma } from "./database.js";
const cors = require("cors");

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

const corsHandler = cors()(handler);

module.exports.handler = async (event, context) => {
  return await corsHandler(event, context);
};