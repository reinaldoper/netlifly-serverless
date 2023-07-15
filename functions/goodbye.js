const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello netlifly, World!' }),
  };
};

export { handler };
