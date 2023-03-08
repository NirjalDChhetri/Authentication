const successResponse = (res, status, data, message) => {
  const response = {}
  response.status = status;
  response.data = data;
  response.message = message;
  return res.status(200).json(response);
};

export default successResponse;
