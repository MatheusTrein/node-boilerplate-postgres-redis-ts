import "dotenv/config";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";

import connectionTypeORM from "@shared/infra/typeorm";
import { router } from "./routes";
import { AppError } from "@shared/errors/AppError";

if (process.env.NODE_ENV !== "test") {
  connectionTypeORM.initialize();
}

const app = express();

app.use(express.json());

app.use(router);

// Global Exceptions Handling
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    } else {
      return response.status(500).json({
        message: error.message,
      });
    }
  }
);

export { app };
