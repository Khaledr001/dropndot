import { Request, Response } from "express";
import { userService } from "../services/userServices";
import { errorResponse, successResponse } from "../services/responseService";
import createError from "http-errors";
import { join } from "path";

class UserController {
  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await userService.create(req.body);

      return successResponse(res, {
        statusCode: 201,
        message: "User created successfully",
        payload: { ...user },
      });
    } catch (error: any) {
      return errorResponse(res, {
        statusCode: error.status || 400,
        message: error.message || "Failed to create user",
      });
    }
  };

  findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await userService.findAll();
      if (!users || users.length === 0) {
        throw createError.NotFound("Users not found!");
      }
      return successResponse(res, {
        statusCode: 200,
        message: "Users fetched successfully",
        payload: users,
      });
    } catch (error: any) {
      return errorResponse(res, {
        statusCode: error.status || 500,
        message: error.message || "Failed to fetch users",
      });
    }
  };

  findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id);
      if (!id) throw createError[400]("Invalid id!");

      const user = await userService.findOne(id);

      if(!user) throw createError[400]("User not found");

      return successResponse(res, {
        statusCode: 200,
        message: "User fetched successfully",
        payload: user,
      });
    } catch (error: any) {
      return errorResponse(res, {
        statusCode: error.status || 500,
        message: error.message || "Failed to fetch user",
      });
    }
  };

  update = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id);
      if (!id) throw createError[400]("Invalid id!");

      const user = await userService.update(id, req.body);
      if (!user) throw createError[400]("User can not updated!");

      return successResponse(res, {
        statusCode: 200,
        message: "User updated successfully",
        payload: user,
      });
    } catch (error: any) {
      return errorResponse(res, {
        statusCode: error.status || 400,
        message: error.message || "Failed to update user",
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id);
      if (!id) throw createError[400]("Invalid id!");

      await userService.delete(id);
      return successResponse(res, {
        statusCode: 204,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return errorResponse(res, {
        statusCode: error.status || 400,
        message: error.message || "Failed to delete user",
      });
    }
  };
}

const userController = new UserController();
export { userController };
