import cors from "cors";
import express, { RequestHandler } from "express";
import cookieParser from "cookie-parser";


export const globalMiddlewares: RequestHandler[] = [
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
  express.json(),
  cookieParser(),
];
