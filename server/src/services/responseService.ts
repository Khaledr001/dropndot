import { Response } from "express";

const errorResponse = (
  res: Response,
  { statusCode = 500, message = "Internal Server Error", payload = {} }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    payload,
  });
};

const successResponse = (
  res: Response,
  { statusCode = 200, message = "Success", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};

export { errorResponse, successResponse };
