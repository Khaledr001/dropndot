import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../services/responseService";

const runValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      errorResponse(res, {
        statusCode: 422,
        message: "Validation Failed",
        payload: { errors: errors.array() },
      });
    } else return next();
  } catch (error: any) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export { runValidation };
