// src/getItems.js
import { prisma } from "./database.js";
const cors = require("cors");

const handler = async (event) => {
  const items = await prisma.employee.findMany();
  return {
    statusCode: 201,
    body: JSON.stringify(items),
  };
};

const corsHandler = cors()(handler);

module.exports.handler = async (event, context) => {
  return await corsHandler(event, context);
};


