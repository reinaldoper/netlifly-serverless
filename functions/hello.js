
const handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: 'Hello, World!' }),
  };
};

export { handler };
