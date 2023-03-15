import { NestMiddleware } from "@nestjs/common";
import { Response, Request } from "express";

export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: Function) {
        console.log(req.method, req.url, req.body, req.headers);
        next();
    }

}