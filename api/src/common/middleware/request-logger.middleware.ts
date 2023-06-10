import { HttpStatus, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export default class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
      const statusCode = res.statusCode;
      const missingCodes = [
        HttpStatus.UNAUTHORIZED,
        HttpStatus.NOT_FOUND,
        HttpStatus.METHOD_NOT_ALLOWED,
      ];

      if (missingCodes.includes(statusCode)) {
        this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
      }
    });

    next();
  }
}
