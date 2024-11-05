import express from "express";
import { userController } from "../controller/userController";
import {
  updateUserValidationRules,
  userValidationRules,
} from "../validation/userValidation";
import { runValidation } from "../validation/runValidation";

export const userRoute = express.Router();

userRoute.post(
  "/user/add",
  userValidationRules,
  runValidation,
  userController.create
);

userRoute.get("/user/getAll", userController.findAll);

userRoute.get("/user/:id", userController.findOne);

userRoute.put(
  "/user/update/:id",
  updateUserValidationRules,
  runValidation,
  userController.update
);

userRoute.delete("/user/delete/:id", userController.delete);
